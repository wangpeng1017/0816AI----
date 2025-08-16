// DOM 元素引用
const uploadSection = document.getElementById('uploadSection');
const previewSection = document.getElementById('previewSection');
const loadingSection = document.getElementById('loadingSection');
const resultSection = document.getElementById('resultSection');
const errorSection = document.getElementById('errorSection');

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');
const resultImage = document.getElementById('resultImage');
const flowerName = document.getElementById('flowerName');
const errorMessage = document.getElementById('errorMessage');

const retryBtn = document.getElementById('retryBtn');
const identifyBtn = document.getElementById('identifyBtn');
const newIdentifyBtn = document.getElementById('newIdentifyBtn');
const errorRetryBtn = document.getElementById('errorRetryBtn');

// 全局变量
let currentFile = null;
let currentImageData = null;

// 初始化事件监听器
function initEventListeners() {
    // 上传区域点击事件
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // 文件选择事件
    fileInput.addEventListener('change', handleFileSelect);

    // 拖拽事件
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);

    // 按钮事件
    retryBtn.addEventListener('click', resetToUpload);
    identifyBtn.addEventListener('click', identifyFlower);
    newIdentifyBtn.addEventListener('click', resetToUpload);
    errorRetryBtn.addEventListener('click', resetToUpload);
}

// 处理文件选择
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processFile(file);
    }
}

// 处理拖拽悬停
function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

// 处理拖拽离开
function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

// 处理文件拖拽放置
function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

// 处理文件
function processFile(file) {
    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        showError('请选择 JPG、PNG 或 WEBP 格式的图片文件');
        return;
    }

    // 验证文件大小 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        showError('图片文件大小不能超过 5MB，请选择更小的文件');
        return;
    }

    currentFile = file;
    
    // 压缩并预览图片
    compressAndPreviewImage(file);
}

// 压缩并预览图片
function compressAndPreviewImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // 创建 canvas 进行压缩
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // 计算压缩后的尺寸
            const maxWidth = 800;
            const maxHeight = 800;
            let { width, height } = img;
            
            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // 绘制压缩后的图片
            ctx.drawImage(img, 0, 0, width, height);
            
            // 获取压缩后的数据
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
            currentImageData = compressedDataUrl;
            
            // 显示预览
            previewImage.src = compressedDataUrl;
            showPreview();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// 显示预览界面
function showPreview() {
    hideAllSections();
    previewSection.style.display = 'block';
}

// 识别花朵
async function identifyFlower() {
    if (!currentImageData) {
        showError('请先选择一张图片');
        return;
    }

    showLoading();

    try {
        // 检查是否在本地文件环境（用于测试）
        const isLocalFile = window.location.protocol === 'file:';

        if (isLocalFile) {
            // 本地测试模式：模拟API响应
            console.log('本地测试模式：模拟识别结果');
            await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟网络延迟

            // 模拟识别结果
            const mockFlowers = ['玫瑰', '牡丹', '菊花', '荷花', '桃花', '樱花', '茉莉花', '向日葵'];
            const randomFlower = mockFlowers[Math.floor(Math.random() * mockFlowers.length)];

            showResult(randomFlower);
            return;
        }

        // 准备发送的数据
        const requestData = {
            image: currentImageData,
            prompt: "请识别并告诉我这张图里最主要的花是什么名字？只告诉我名字即可。"
        };

        // 发送请求到后端 API
        const response = await fetch('/api/identify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            showResult(result.flowerName);
        } else {
            throw new Error(result.error || '识别失败');
        }

    } catch (error) {
        console.error('识别错误:', error);
        showError(getErrorMessage(error));
    }
}

// 获取错误信息
function getErrorMessage(error) {
    if (error.message.includes('Failed to fetch')) {
        return '网络连接失败，请检查网络连接后重试';
    } else if (error.message.includes('500')) {
        return '服务器内部错误，请稍后重试';
    } else if (error.message.includes('429')) {
        return 'API 调用频率过高，请稍后重试';
    } else {
        return error.message || '抱歉，暂时无法识别，请换一张更清晰的图片试试';
    }
}

// 显示加载状态
function showLoading() {
    hideAllSections();
    loadingSection.style.display = 'block';
}

// 显示结果
function showResult(name) {
    resultImage.src = currentImageData;
    flowerName.textContent = name;
    hideAllSections();
    resultSection.style.display = 'block';
}

// 显示错误
function showError(message) {
    errorMessage.textContent = message;
    hideAllSections();
    errorSection.style.display = 'block';
}

// 重置到上传界面
function resetToUpload() {
    currentFile = null;
    currentImageData = null;
    fileInput.value = '';
    hideAllSections();
    uploadSection.style.display = 'block';
}

// 隐藏所有区域
function hideAllSections() {
    uploadSection.style.display = 'none';
    previewSection.style.display = 'none';
    loadingSection.style.display = 'none';
    resultSection.style.display = 'none';
    errorSection.style.display = 'none';
}

// 测试函数：使用示例图片
function testWithSampleImage() {
    console.log('开始测试示例图片');

    // 创建一个简单的测试图片（base64格式）
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    // 绘制一个简单的花朵图案
    ctx.fillStyle = '#87CEEB'; // 天蓝色背景
    ctx.fillRect(0, 0, 200, 200);

    // 绘制花朵
    ctx.fillStyle = '#FF69B4'; // 粉红色花瓣

    // 花瓣
    for (let i = 0; i < 8; i++) {
        ctx.save();
        ctx.translate(100, 100);
        ctx.rotate((i * Math.PI) / 4);
        ctx.beginPath();
        ctx.ellipse(0, -20, 10, 15, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    // 花心
    ctx.fillStyle = '#FFD700'; // 金黄色花心
    ctx.beginPath();
    ctx.arc(100, 100, 8, 0, 2 * Math.PI);
    ctx.fill();

    // 获取base64数据
    const testImageData = canvas.toDataURL('image/png');
    currentImageData = testImageData;

    // 显示预览
    previewImage.src = testImageData;
    showPreview();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initEventListeners();

    // 显示上传界面
    resetToUpload();

    console.log('AI识花小程序已加载完成');
});
