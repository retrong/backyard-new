// Blog Posts System - JSON Version
// This version loads blog posts from an external JSON file
// Use this if you prefer managing blog data in JSON format

class BlogManagerJSON extends BlogManager {
    constructor(containerId, postsPerPage = 6, jsonUrl = 'assets/data/blog-posts.json') {
        super(containerId, postsPerPage);
        this.jsonUrl = jsonUrl;
        this.loadFromJSON();
    }

    async loadFromJSON() {
        try {
            const response = await fetch(this.jsonUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.allPosts = data.posts;
            this.filteredPosts = [...this.allPosts];
            this.render();
        } catch (error) {
            console.error('Error loading blog posts:', error);
            this.container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        <h4>Error Loading Blog Posts</h4>
                        <p>Could not load blog posts. Please check the console for details.</p>
                    </div>
                </div>
            `;
        }
    }

    // Override init to prevent immediate render
    // (we need to wait for JSON to load)
    init() {
        if (!this.container) {
            console.error('Blog container not found');
            return;
        }
        // Show loading message
        this.container.innerHTML = `
            <div class="col-12 text-center">
                <p>Loading blog posts...</p>
            </div>
        `;
    }
}

// Usage example:
// To use JSON version instead of JavaScript array version:
/*
document.addEventListener('DOMContentLoaded', function() {
    // Use BlogManagerJSON instead of BlogManager
    window.blogManager = new BlogManagerJSON('blog-posts-grid', 6);
    
    // Or specify a custom JSON file path
    window.blogManager = new BlogManagerJSON(
        'blog-posts-grid', 
        6, 
        'path/to/your/blog-posts.json'
    );
});
*/

// Example: Using with async/await for better control
/*
document.addEventListener('DOMContentLoaded', async function() {
    const blogManager = new BlogManagerJSON('blog-posts-grid', 6);
    
    // Wait for posts to load, then do something
    // Note: BlogManagerJSON automatically renders after loading
    setTimeout(() => {
        if (blogManager.allPosts.length > 0) {
            console.log('Blog posts loaded successfully!');
            console.log('Total posts:', blogManager.allPosts.length);
        }
    }, 1000);
});
*/

// Fetch API Helper - For custom implementations
class BlogDataService {
    constructor(jsonUrl = 'assets/data/blog-posts.json') {
        this.jsonUrl = jsonUrl;
    }

    async getAllPosts() {
        try {
            const response = await fetch(this.jsonUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.posts;
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return [];
        }
    }

    async getPostBySlug(slug) {
        const posts = await this.getAllPosts();
        return posts.find(post => post.slug === slug);
    }

    async getFeaturedPosts(limit = 3) {
        const posts = await this.getAllPosts();
        return posts.filter(post => post.featured).slice(0, limit);
    }

    async getRecentPosts(limit = 5) {
        const posts = await this.getAllPosts();
        return posts.slice(0, limit);
    }

    async getPostsByCategory(category) {
        const posts = await this.getAllPosts();
        return posts.filter(post => 
            post.category.toLowerCase() === category.toLowerCase()
        );
    }

    async searchPosts(query) {
        const posts = await this.getAllPosts();
        const searchTerm = query.toLowerCase();
        return posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.category.toLowerCase().includes(searchTerm)
        );
    }
}

// Usage example for BlogDataService:
/*
const blogService = new BlogDataService();

// Get all posts
const allPosts = await blogService.getAllPosts();

// Get featured posts
const featured = await blogService.getFeaturedPosts(3);

// Search posts
const searchResults = await blogService.searchPosts('technology');

// Get posts by category
const techPosts = await blogService.getPostsByCategory('Technology');
*/
