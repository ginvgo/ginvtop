// 主 JavaScript 文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前活动导航项
    setActiveNavItem();
    
    // 根据当前页面加载特定功能
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index.html':
            loadLatestArticles();
            break;
        case 'articles.html':
            loadAllArticles();
            break;
        case 'resources.html':
            loadResources();
            break;
        case 'calculator.html':
            initCalculator();
            break;
        case 'tools.html':
            initTools();
            break;
    }
});

// 获取当前页面名称
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    return page || 'index.html';
}

// 设置当前活动导航项
function setActiveNavItem() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// 加载最新文章（首页）
function loadLatestArticles() {
    const latestArticlesContainer = document.getElementById('latest-articles');
    if (!latestArticlesContainer) return;

    // 从 GitHub 加载文章数据
    // 实际应用中，这里会使用 fetch API 从 GitHub 仓库的 articles.json 文件获取数据
    // 这里使用模拟数据进行演示
    const articles = [
        {
            title: '网站上线啦！',
            date: '2025-04-09',
            summary: '今天我的个人网站正式上线，这是一个重要的里程碑...',
            url: 'articles/welcome.html'
        },
        {
            title: '如何使用本站的计算器功能',
            date: '2025-04-08',
            summary: '本文将介绍如何使用本站提供的多功能计算器...',
            url: 'articles/calculator-guide.html'
        }
    ];
    
    let html = '';
    articles.slice(0, 3).forEach(article => {
        html += `
            <div class="article-preview">
                <h4><a href="${article.url}">${article.title}</a></h4>
                <div class="article-meta">${article.date}</div>
                <p>${article.summary}</p>
            </div>
        `;
    });
    
    latestArticlesContainer.innerHTML = html;
}

// 加载所有文章（文章页面）
function loadAllArticles() {
    const articlesContainer = document.getElementById('articles-container');
    if (!articlesContainer) return;
    
    // 从 GitHub 加载文章数据
    // 实际实现中会从 GitHub 仓库获取数据
    const articles = [
        {
            title: '网站上线啦！',
            date: '2025-04-09',
            summary: '今天我的个人网站正式上线，这是一个重要的里程碑...',
            url: 'articles/welcome.html'
        },
        {
            title: '如何使用本站的计算器功能',
            date: '2025-04-08',
            summary: '本文将介绍如何使用本站提供的多功能计算器...',
            url: 'articles/calculator-guide.html'
        },
        {
            title: '推荐几款实用的在线工具',
            date: '2025-04-07',
            summary: '在互联网时代，有许多优秀的在线工具可以提高我们的工作效率...',
            url: 'articles/online-tools.html'
        }
    ];
    
    let html = '';
    articles.forEach(article => {
        html += `
            <div class="article-item">
                <h3><a href="${article.url}">${article.title}</a></h3>
                <div class="article-meta">${article.date}</div>
                <p>${article.summary}</p>
                <a href="${article.url}" class="btn">阅读全文</a>
            </div>
        `;
    });
    
    articlesContainer.innerHTML = html;
}

// 加载资源文件
function loadResources() {
    const resourcesContainer = document.getElementById('resources-container');
    if (!resourcesContainer) return;
    
    // 从 GitHub 加载资源数据
    const resources = [
        {
            name: '网站使用指南.pdf',
            type: 'PDF',
            size: '1.2 MB',
            url: 'resources/website-guide.pdf'
        },
        {
            name: '常用工具合集.zip',
            type: 'ZIP',
            size: '5.8 MB',
            url: 'resources/tools-collection.zip'
        },
        {
            name: '学习资料.docx',
            type: 'DOCX',
            size: '0.8 MB',
            url: 'resources/learning-materials.docx'
        }
    ];
    
    let html = '';
    resources.forEach(resource => {
        html += `
            <div class="resource-item">
                <div class="resource-icon">📄</div>
                <div class="resource-info">
                    <h3><a href="${resource.url}">${resource.name}</a></h3>
                    <p>类型: ${resource.type} | 大小: ${resource.size}</p>
                </div>
            </div>
        `;
    });
    
    resourcesContainer.innerHTML = html;
}

// 初始化计算器
function initCalculator() {
    const calculator = document.querySelector('.calculator');
    if (!calculator) return;
    
    let display = document.querySelector('.calculator-display');
    let keys = document.querySelector('.calculator-keys');
    
    let displayValue = '0';
    let firstOperand = null;
    let waitingForSecondOperand = false;
    let operator = null;
    
    updateDisplay();
    
    keys.addEventListener('click', function(e) {
        const element = e.target;
        
        if (!element.matches('button')) return;
        
        if (element.classList.contains('calculator-key--operator')) {
            handleOperator(element.value);
            updateDisplay();
            return;
        }
        
        if (element.classList.contains('calculator-key--clear')) {
            clear();
            updateDisplay();
            return;
        }
        
        if (element.classList.contains('calculator-key--decimal')) {
            inputDecimal();
            updateDisplay();
            return;
        }
        
        if (element.classList.contains('calculator-key--equal')) {
            performCalculation();
            updateDisplay();
            return;
        }
        
        inputDigit(element.value);
        updateDisplay();
    });
    
    function updateDisplay() {
        display.textContent = displayValue;
    }
    
    function inputDigit(digit) {
        if (waitingForSecondOperand) {
            displayValue = digit;
            waitingForSecondOperand = false;
        } else {
            displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }
    
    function inputDecimal() {
        if (waitingForSecondOperand) {
            displayValue = '0.';
            waitingForSecondOperand = false;
            return;
        }
        
        if (!displayValue.includes('.')) {
            displayValue += '.';
        }
    }
    
    function clear() {
        displayValue = '0';
        firstOperand = null;
        waitingForSecondOperand = false;
        operator = null;
    }
    
    function handleOperator(nextOperator) {
        const inputValue = parseFloat(displayValue);
        
        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }
        
        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation();
            displayValue = String(result);
            firstOperand = result;
        }
        
        waitingForSecondOperand = true;
        operator = nextOperator;
    }
    
    function performCalculation() {
        const inputValue = parseFloat(displayValue);
        
        if (operator === '+') {
            return firstOperand + inputValue;
        } else if (operator === '-') {
            return firstOperand - inputValue;
        } else if (operator === '*') {
            return firstOperand * inputValue;
        } else if (operator === '/') {
            return firstOperand / inputValue;
        }
        
        return inputValue;
    }
}

// 初始化工具
function initTools() {
    // 工具页面的特定功能初始化
    console.log('工具页面已加载');
}
