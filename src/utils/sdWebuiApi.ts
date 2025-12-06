// src/utils/sdWebuiApi.ts
// 专用于调用 Stable Diffusion WebUI 的 API 客户端

export interface SDWebuiGenerateParams {
    prompt: string;
    width: number;
    height: number;
    steps: number;
    seed?: number;
    batch_size?: number;
    model?: string; // 保留参数，但你可能暂时用不到
    images?: string[]; // 保留参数，用于未来可能的图生图
    negative_prompt?: string;
}

export interface SDWebuiResponse {
    images: string[]; // Base64 编码的图片数组
    parameters: Record<string, any>;
    info: string;
}

/**
 * 调用 Stable Diffusion WebUI 生成图片
 * @param params 生成参数
 * @returns 包含 Base64 图片的 Promise
 */
export async function generateImageBySDWebui(params: SDWebuiGenerateParams): Promise<string> {
    // 你的 Stable Diffusion WebUI 服务器地址
    const SD_WEBUI_BASE_URL = 'http://192.168.1.6:7860';
    const apiUrl = `${SD_WEBUI_BASE_URL}/sdapi/v1/txt2img`;

    // 安全负面提示词模板
    const safetyNegativePrompt =
        'nsfw, nude, naked, sexual, explicit, porn, sexy, adult content, ' +
        'worst quality, low quality, bad anatomy, bad hands, missing fingers, ' +
        'extra digit, fewer digits, cropped, jpeg artifacts, signature, watermark, ' +
        'username, blurry, artist name, deformed, ugly, disfigured, poorly drawn, ' +
        'extra limbs, malformed limbs, missing arms, missing legs, fused fingers, ' +
        'too many fingers, long neck, mutated hands and fingers';

    // 准备请求体，映射参数到 SD-WebUI 的格式
    const payload = {
        prompt: params.prompt,
        negative_prompt: params.negative_prompt
            ? `${params.negative_prompt}, ${safetyNegativePrompt}`
            : safetyNegativePrompt,
        steps: params.steps || 20,
        width: params.width || 512,
        height: params.height || 512,
        cfg_scale: 7, // 引导系数，常用值 7，可调整
        seed: params.seed || -1, // -1 表示随机
        batch_size: params.batch_size || 1,
        // 你可以根据需要添加更多参数，如 sampler_name, enable_hr 等
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[SD-WebUI] API 错误详情:', {
                status: response.status,
                url: apiUrl,
                error: errorText
            });
            throw new Error(`SD-WebUI API 错误 (${response.status}): ${errorText.substring(0, 200)}`);
        }

        const data: SDWebuiResponse = await response.json();

        // 验证响应数据
        if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
            throw new Error('SD-WebUI 返回的图片数据为空');
        }

        const base64Image = data.images[0];
        // 返回与原项目兼容的格式：data:image/png;base64, 前缀
        return `data:image/png;base64,${base64Image}`;

    } catch (error) {
        console.error('[SD-WebUI] 生成图片失败:', error);
        // 重新抛出错误，让上层路由处理
        throw new Error(`图片生成失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
}

export async function getAvailableModels(): Promise<string[]> {
    const SD_WEBUI_BASE_URL = 'http://192.168.1.6:7860';
    try {
        const response = await fetch(`${SD_WEBUI_BASE_URL}/sdapi/v1/sd-models`);
        const data = await response.json();
        // 返回模型名称列表
        return data.map((item: any) => item.model_name || item.title);
    } catch (error) {
        console.error('Failed to fetch models:', error);
        return ['Stable Diffusion WebUI']; // 失败时返回默认
    }
}

/**
 * 调用 SD-WebUI 的 /sdapi/v1/options 接口来切换模型
 * @param modelName 要切换到的模型在 SD-WebUI 中的完整名称 (title)
 */
export async function switchSDWebuiModel(modelName: string): Promise<void> {
    // 您的 Stable Diffusion WebUI 服务器地址
    const SD_WEBUI_BASE_URL = 'http://192.168.1.6:7860';
    const apiUrl = `${SD_WEBUI_BASE_URL}/sdapi/v1/options`;

    const payload = {
        // SD-WebUI API 中用于切换模型的关键字段
        sd_model_checkpoint: modelName
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`SD-WebUI 切换模型失败 (${response.status}): ${errorText.substring(0, 200)}`);
        }

        console.log(`[SD-WebUI] 模型已成功切换到: ${modelName}`);

    } catch (error) {
        console.error('[SD-WebUI] 切换模型失败:', error);
        throw new Error(`切换模型失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
}

