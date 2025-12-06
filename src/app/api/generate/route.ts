import { NextResponse } from 'next/server'
//import { generateImageBySDWebui } from '@/utils/sdWebuiApi'
// app/api/generate/route.ts
import { generateImageBySDWebui, switchSDWebuiModel } from '@/utils/sdWebuiApi'
// SD-WebUI 基础地址 (与 sdWebuiApi.ts 中的保持一致)
//const SD_WEBUI_BASE_URL = 'http://192.168.1.8:7860';

/**
 * 简化的 Token 验证（仅用于本地开发演示）
 * 在实际生产环境中，应使用更安全的验证方式
 */
function validateToken(providedToken: string): boolean {
    // 本地开发环境下，可以接受一个固定的测试token或直接通过
    // 这里我们简单检查token是否存在，你可以根据需要加强验证

    //完全接受任何Token（最快测试）
    console.log(`[DEV] Provided token: ${providedToken.substring(0, 10)}...`);
    return true; // ← 这里直接返回true，接受所有Token

    // const expectedToken = process.env.NEXT_PUBLIC_API_KEY || 'local_dev_token';
    // return providedToken === expectedToken;
}

// async function getSDWebuiModelName(appModelId: string): Promise<string | null> {
//     try {
//         // 直接调用 SD-WebUI API 获取模型列表，进行映射
//         const response = await fetch(`${SD_WEBUI_BASE_URL}/sdapi/v1/sd-models`);
//         if (!response.ok) {
//             console.error('Failed to fetch SD-WebUI models for mapping.');
//             return null;
//         }
//
//         const sdModels = await response.json();
//
//         // 尝试匹配 'sd-webui-X' 格式的 ID
//         const indexMatch = appModelId.match(/^sd-webui-(\d+)$/);
//
//         if (indexMatch) {
//             const index = parseInt(indexMatch[1], 10);
//             if (index >= 0 && index < sdModels.length) {
//                 // 返回 SD-WebUI 实际的模型名称 (title)
//                 return sdModels[index].title || sdModels[index].model_name || null;
//             }
//         }
//
//         // 对于非 SD-WebUI 模型 ID (如 'Z-Image-Turbo')，返回 null，不进行切换
//         return null;
//
//     } catch (error) {
//         console.error('Error fetching SD-Webui model mapping:', error);
//         return null;
//     }
// }


export async function POST(request: Request) {
    try {
        // 1. 验证认证头
        const authHeader = request.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Missing or invalid Authorization header' },
                { status: 401 }
            );
        }

        const providedToken = authHeader.substring(7); // 移除 "Bearer " 前缀

        // 2. 简化token验证
        if (!validateToken(providedToken)) {
            return NextResponse.json(
                { error: 'Invalid API key' },
                { status: 401 }
            );
        }

        // 3. 解析请求参数
        const body = await request.json();
        const {
            prompt,
            width,
            height,
            steps,
            seed,
            batch_size,
            model,
            images,
            negative_prompt
        } = body;

        // 4. 参数验证（保持基本验证）
        if (!prompt || prompt.trim() === '') {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        if (width < 64 || width > 1440 || height < 64 || height > 1440) {
            return NextResponse.json(
                { error: 'Invalid image dimensions (64-1440)' },
                { status: 400 }
            );
        }

        if (steps < 5 || steps > 32) {
            return NextResponse.json(
                { error: 'Invalid steps value (5-32)' },
                { status: 400 }
            );
        }
        // // 5. 模型切换逻辑 (选择ID版本)
        // const frontendModelId = model || 'SD-WebUI';
        // const sdWebuiModelName = await getSDWebuiModelName(frontendModelId);
        //
        // if (sdWebuiModelName) {
        //     // 如果找到了 SD-WebUI 的真实模型名称，则执行切换操作
        //     await switchSDWebuiModel(sdWebuiModelName);
        // } else if (frontendModelId.startsWith('sd-webui-')) {
        //     console.warn(`[Generate API] 找不到 ID: ${frontendModelId} 对应的 SD-WebUI 模型名称，将使用当前加载的模型。`);
        // }

        // 5. 模型切换逻辑 (简化版，选择名称版本)
        const frontendModelId = model || '';
        console.log('[Generate API] 前端请求的模型:', frontendModelId);

        // 只有当提供了有效的模型名称时才尝试切换
        if (frontendModelId && frontendModelId.trim() !== '') {
            try {
                // 直接使用前端传递的模型名称进行切换
                await switchSDWebuiModel(frontendModelId);
                console.log(`[Generate API] 已尝试切换到模型: ${frontendModelId}`);
            } catch (switchError) {
                console.warn(`[Generate API] 切换模型失败 (${frontendModelId}):`, switchError);
                // 切换失败不影响继续生成
            }
        }

        // 6. 调用你的 Stable Diffusion WebUI
        const imageUrl = await generateImageBySDWebui({
            prompt,
            width: width || 512,
            height: height || 512,
            steps: steps || 20,
            seed: seed ? parseInt(seed) : undefined,
            batch_size: batch_size || 1,
            //model: model || 'SD-WebUI', // 传递模型名称，即使你的实现可能忽略它
            images,
            negative_prompt,
        });

        // 7. 返回生成的图片URL
        return NextResponse.json({
            success: true,
            imageUrl
        });

    } catch (error) {
        console.error('Error in generate API:', error);

        // 返回更详细的错误信息
        const errorMessage = error instanceof Error
            ? error.message
            : 'Failed to generate image';

        return NextResponse.json(
            {
                error: errorMessage,
                success: false
            },
            { status: 500 }
        );
    }
}