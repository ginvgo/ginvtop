// content-api.js - 用于从 GitHub 后台获取内容

// 获取文章列表
async function getArticles() {
    try {
        // 在实际应用中，这里会从 GitHub 仓库获取数据
        // 例如使用 GitHub API 或直接获取 JSON 文件
        const response = await fetch('data/content.json');
        const data = await response.json();
        return data.articles || [];
    } catch (error) {
        console.error('获取文章列表失败:', error);
        return [];
    }
}

// 获取指定ID的文章详情
async function getArticleById(id) {
    try {
        const articles = await getArticles();
        return articles.find(article => article.id === id) || null;
    } catch (error) {
        console.error(`获取文章 ${id} 失败:`, error);
        return null;
    }
}

// 获取资源列表
async function getResources() {
    try {
        const response = await fetch('data/content.json');
        const data = await response.json();
        return data.resources || [];
    } catch (error) {
        console.error('获取资源列表失败:', error);
        return [];
    }
}

// 获取指定ID的资源详情
async function getResourceById(id) {
    try {
        const resources = await getResources();
        return resources.find(resource => resource.id === id) || null;
    } catch (error) {
        console.error(`获取资源 ${id} 失败:`, error);
        return null;
    }
}

// 获取工具列表
async function getTools() {
    try {
        const response = await fetch('data/content.json');
        const data = await response.json();
        return data.tools || [];
    } catch (error) {
        console.error('获取工具列表失败:', error);
        return [];
    }
}

// 获取指定ID的工具详情
async function getToolById(id) {
    try {
        const tools = await getTools();
        return tools.find(tool => tool.id === id) || null;
    } catch (error) {
        console.error(`获取工具 ${id} 失败:`, error);
        return null;
    }
}

// 导出所有函数
export {
    getArticles,
    getArticleById,
    getResources,
    getResourceById,
    getTools,
    getToolById
};
