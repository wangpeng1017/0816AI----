import { useState, useRef, useCallback } from 'react';

export default function FlowerIdentifier() {
  const [currentStep, setCurrentStep] = useState('upload'); // upload, preview, loading, result, error
  const [currentImageData, setCurrentImageData] = useState(null);
  const [flowerName, setFlowerName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  // 处理文件选择
  const handleFileSelect = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
    }
  }, []);

  // 处理文件拖拽
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  // 处理文件
  const processFile = useCallback((file) => {
    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('请选择 JPG、PNG 或 WEBP 格式的图片文件');
      setCurrentStep('error');
      return;
    }

    // 验证文件大小 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage('图片文件大小不能超过 5MB，请选择更小的文件');
      setCurrentStep('error');
      return;
    }

    // 压缩并预览图片
    compressAndPreviewImage(file);
  }, []);

  // 压缩并预览图片
  const compressAndPreviewImage = useCallback((file) => {
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
        setCurrentImageData(compressedDataUrl);
        setCurrentStep('preview');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, []);

  // 识别花朵
  const identifyFlower = useCallback(async () => {
    if (!currentImageData) {
      setErrorMessage('请先选择一张图片');
      setCurrentStep('error');
      return;
    }

    setCurrentStep('loading');

    try {
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
        setFlowerName(result.flowerName);
        setCurrentStep('result');
      } else {
        throw new Error(result.error || '识别失败');
      }

    } catch (error) {
      console.error('识别错误:', error);
      setErrorMessage(getErrorMessage(error));
      setCurrentStep('error');
    }
  }, [currentImageData]);

  // 获取错误信息
  const getErrorMessage = useCallback((error) => {
    if (error.message.includes('Failed to fetch')) {
      return '网络连接失败，请检查网络连接后重试';
    } else if (error.message.includes('500')) {
      return '服务器内部错误，请稍后重试';
    } else if (error.message.includes('429')) {
      return 'API 调用频率过高，请稍后重试';
    } else {
      return error.message || '抱歉，暂时无法识别，请换一张更清晰的图片试试';
    }
  }, []);

  // 重置到上传界面
  const resetToUpload = useCallback(() => {
    setCurrentImageData(null);
    setFlowerName('');
    setErrorMessage('');
    setCurrentStep('upload');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  // 点击上传区域
  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="flower-identifier">
      {/* 上传区域 */}
      {currentStep === 'upload' && (
        <div className="upload-section">
          <div 
            className="upload-area" 
            onClick={handleUploadClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="upload-icon">📷</div>
            <p className="upload-text">点击上传图片或拍照</p>
            <p className="upload-hint">支持 JPG、PNG、WEBP 格式，最大 5MB</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/jpeg,image/jpg,image/png,image/webp" 
            capture="environment"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {/* 预览区域 */}
      {currentStep === 'preview' && (
        <div className="preview-section">
          <div className="image-preview">
            <img 
              src={currentImageData} 
              alt="花朵预览图片 - 准备进行AI花草识别" 
              className="preview-image"
            />
          </div>
          <div className="preview-actions">
            <button className="btn btn-secondary" onClick={resetToUpload}>
              重新选择
            </button>
            <button className="btn btn-primary" onClick={identifyFlower}>
              开始识别
            </button>
          </div>
        </div>
      )}

      {/* 加载状态 */}
      {currentStep === 'loading' && (
        <div className="loading-section">
          <div className="loading-spinner"></div>
          <p className="loading-text">正在进行AI花草识别，请稍候...</p>
        </div>
      )}

      {/* 结果展示区域 */}
      {currentStep === 'result' && (
        <div className="result-section">
          <div className="result-content">
            <div className="result-image">
              <img 
                src={currentImageData} 
                alt={`识别结果：${flowerName} - AI花草识别成功`}
                className="result-image-img"
              />
            </div>
            <div className="result-info">
              <h2 className="result-title">花草识别结果</h2>
              <div className="flower-name">{flowerName}</div>
              <button className="btn btn-primary" onClick={resetToUpload}>
                再次识别
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 错误提示区域 */}
      {currentStep === 'error' && (
        <div className="error-section">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h3 className="error-title">识别失败</h3>
            <p className="error-message">{errorMessage}</p>
            <button className="btn btn-primary" onClick={resetToUpload}>
              重新尝试
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
