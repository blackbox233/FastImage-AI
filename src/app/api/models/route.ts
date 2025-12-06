import { NextResponse } from 'next/server'

// 模型配置接口
interface ModelConfig {
    id: string;
    name: string;
    image: string;
    use_i2i: boolean;
    use_t2i: boolean;
    maxImages: number;
    tags?: string[];
    isRecommended?: boolean;
}

export async function GET() {
    try {
        // 从你的 SD-WebUI 获取真实模型列表
        const sdWebuiUrl = process.env.SD_WEBUI_URL || 'http://192.168.1.6:7860';

        let models: ModelConfig[] = [];

        try {
            // 尝试从 SD-WebUI API 获取模型列表
            const response = await fetch(`${sdWebuiUrl}/sdapi/v1/sd-models`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const sdModels = await response.json();

                // 将 SD-WebUI 的模型格式转换为我们的 ModelConfig 格式
                models = sdModels.map((sdModel: any, index: number) => ({
                    id: sdModel.model_name,
                    name: sdModel.title || sdModel.model_name || `SD Model ${index + 1}`,
                    image: '/models/Wai-SDXL-V150.jpg', // 使用默认图片
                    use_i2i: true, // SD-WebUI 支持图生图
                    use_t2i: true, // SD-WebUI 支持文生图
                    maxImages: 1,
                    tags: ['stable-diffusion', 'local-model'],
                    isRecommended: index === 0, // 第一个模型标记为推荐
                }));
            } else {
                console.warn('无法从 SD-WebUI 获取模型列表，使用默认配置');
            }
        } catch (error) {
            console.error('连接 SD-WebUI 失败:', error);
        }

        // 如果从 SD-WebUI 获取失败，返回一个默认模型配置
        if (models.length === 0) {
            models = [
                {
                    id: 'stable-diffusion-webui',
                    name: 'Stable Diffusion WebUI',
                    image: '/models/default-model.jpg',
                    use_i2i: true,
                    use_t2i: true,
                    maxImages: 1,
                    tags: ['stable-diffusion', 'local-model'],
                    isRecommended: true,
                }
            ];
        }

        return NextResponse.json({
            success: true,
            models
        });

    } catch (error) {
        console.error('Error in models API:', error);

        // 即使出错也返回一个默认模型，确保前端不会崩溃
        return NextResponse.json({
            success: true,
            models: [
                {
                    id: 'stable-diffusion-webui',
                    name: 'Stable Diffusion WebUI',
                    image: '/models/default-model.jpg',
                    use_i2i: true,
                    use_t2i: true,
                    maxImages: 1,
                    tags: ['stable-diffusion', 'local-model'],
                    isRecommended: true,
                }
            ]
        });
    }
}