/**
 * Vercel云函数 - 调用智谱AI GLM-4.5V模型识别花朵
 * 
 * 功能：
 * 1. 接收前端上传的图片数据（base64格式）
 * 2. 调用智谱AI GLM-4.5V模型进行花朵识别
 * 3. 返回识别结果给前端
 */

export default async function handler(req, res) {
    // 设置CORS头，允许跨域请求
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理预检请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 只允许POST请求
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: '只支持POST请求'
        });
    }

    try {
        // 获取请求数据
        const { image, prompt } = req.body;

        // 验证必要参数
        if (!image) {
            return res.status(400).json({
                success: false,
                error: '缺少图片数据'
            });
        }

        // 验证API Key
        const apiKey = process.env.ZHIPU_API_KEY;
        if (!apiKey) {
            console.error('ZHIPU_API_KEY环境变量未设置');
            return res.status(500).json({
                success: false,
                error: '服务器配置错误'
            });
        }

        // 构造智谱AI API请求数据
        const requestData = {
            model: "glm-4.5v",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "image_url",
                            image_url: {
                                url: image // 前端传来的base64格式图片
                            }
                        },
                        {
                            type: "text",
                            text: prompt || "请识别并告诉我这张图里最主要的花是什么名字？只告诉我名字即可。"
                        }
                    ]
                }
            ],
            stream: false, // 不使用流式响应
            temperature: 0.1 // 降低随机性，提高识别准确性
        };

        console.log('正在调用智谱AI API...');

        // 调用智谱AI API
        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Accept-Language': 'zh-CN,zh'
            },
            body: JSON.stringify(requestData)
        });

        // 检查响应状态
        if (!response.ok) {
            const errorText = await response.text();
            console.error('智谱AI API错误:', response.status, errorText);
            
            let errorMessage = '识别服务暂时不可用';
            if (response.status === 401) {
                errorMessage = 'API密钥无效';
            } else if (response.status === 429) {
                errorMessage = 'API调用频率过高，请稍后重试';
            } else if (response.status === 400) {
                errorMessage = '请求参数错误，请检查图片格式';
            }

            return res.status(response.status).json({
                success: false,
                error: errorMessage
            });
        }

        // 解析响应数据
        const result = await response.json();
        console.log('智谱AI API响应:', JSON.stringify(result, null, 2));

        // 检查响应格式
        if (!result.choices || !result.choices[0] || !result.choices[0].message) {
            console.error('智谱AI API响应格式异常:', result);
            return res.status(500).json({
                success: false,
                error: '识别结果格式异常'
            });
        }

        // 提取花朵名称
        const flowerName = result.choices[0].message.content.trim();
        
        // 简单的后处理，去除可能的前缀和后缀
        const cleanedName = cleanFlowerName(flowerName);

        console.log('识别结果:', cleanedName);

        // 返回成功结果
        return res.status(200).json({
            success: true,
            flowerName: cleanedName,
            originalResponse: flowerName // 保留原始响应用于调试
        });

    } catch (error) {
        console.error('处理请求时发生错误:', error);
        
        // 根据错误类型返回不同的错误信息
        let errorMessage = '服务器内部错误，请稍后重试';
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            errorMessage = '网络连接失败，请检查网络连接';
        } else if (error.message.includes('timeout')) {
            errorMessage = '请求超时，请稍后重试';
        }

        return res.status(500).json({
            success: false,
            error: errorMessage
        });
    }
}

/**
 * 清理花朵名称，去除不必要的前缀和后缀
 * @param {string} rawName - 原始识别结果
 * @returns {string} - 清理后的花朵名称
 */
function cleanFlowerName(rawName) {
    if (!rawName || typeof rawName !== 'string') {
        return '未知花朵';
    }

    let cleaned = rawName.trim();

    // 去除常见的前缀
    const prefixes = [
        '这是', '这可能是', '这应该是', '这张图片中的花是',
        '图片中的花是', '这朵花是', '这种花是', '识别结果：',
        '花名：', '花朵名称：', '答案：', '结果：'
    ];

    for (const prefix of prefixes) {
        if (cleaned.startsWith(prefix)) {
            cleaned = cleaned.substring(prefix.length).trim();
        }
    }

    // 去除常见的后缀
    const suffixes = [
        '花', '。', '！', '!', '.', '，', ','
    ];

    for (const suffix of suffixes) {
        if (cleaned.endsWith(suffix) && cleaned.length > suffix.length) {
            cleaned = cleaned.substring(0, cleaned.length - suffix.length).trim();
        }
    }

    // 如果清理后为空，返回原始结果
    if (!cleaned) {
        return rawName.trim() || '未知花朵';
    }

    return cleaned;
}
