// Blog Posts Data
const blogPosts = [
    {
        id: 1,
        title: "Making The Feast Or Famine Of Freelancing",
        excerpt: "Making ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        image: "assets/img/blog/blog-1.png",
        author: "Admin",
        date: "August 15, 2025",
        slug: "making-the-feast-or-famine-of-freelancing",
        category: "Business",
        featured: true
    },
    {
        id: 2,
        title: "I Used The Web For A Day On A 50 MB Budget",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        image: "assets/img/blog/blog-2.png",
        author: "Admin",
        date: "August 15, 2025",
        slug: "i-used-the-web-for-a-day-on-50mb-budget",
        category: "Technology",
        featured: true
    },
    {
        id: 3,
        title: "Here are the 5 most telling signs of micromanagement",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        image: "assets/img/blog/blog-3.png",
        author: "Admin",
        date: "August 15, 2025",
        slug: "5-signs-of-micromanagement",
        category: "Management",
        featured: true
    },
    {
        id: 4,
        title: "Add And Show Image With Size From Elementor Widget",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        image: "assets/img/blog/blog-2.png",
        author: "Admin",
        date: "August 15, 2025",
        slug: "elementor-widget-image-size",
        category: "Development",
        featured: true
    },
    {
        id: 5,
        title: "How To The Active Menu Based On URL In Next.JS?",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        image: "assets/img/blog/blog-2.png",
        author: "Admin",
        date: "August 15, 2025",
        slug: "active-menu-nextjs",
        category: "Development",
        featured: true
    },
    {
        id: 6,
        title: "Instagram Feed Add To Your WordPress Site",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        image: "assets/img/blog/blog-3.png",
        author: "Admin",
        date: "August 15, 2025",
        slug: "instagram-feed-wordpress",
        category: "WordPress",
        featured: true
    }
];

// Blog Manager Class
class BlogManager {
    constructor(containerId, postsPerPage = 6) {
        this.container = document.getElementById(containerId);
        this.postsPerPage = postsPerPage;
        this.currentPage = 1;
        this.allPosts = blogPosts;
        this.filteredPosts = [...blogPosts];
        this.init();
    }

    init() {
        if (!this.container) {
            console.error('Blog container not found');
            return;
        }
        this.render();
    }

    // Create single blog post HTML
    createBlogPostHTML(post) {
        return `
            <div class="col-lg-4 col-md-6">
                <div class="single-blog-post">
                    <div class="post-image">
                        <a href="single-blog.html?slug=${post.slug}">
                            <img src="${post.image}" alt="${post.title}">
                        </a>
                    </div>

                    <div class="post-content">
                        <p>${post.author} / ${post.date}</p>
                        
                        <div class="content">
                            <h3><a href="single-blog.html?slug=${post.slug}">${post.title}</a></h3>
                            <p>${post.excerpt}</p>
                            <a href="single-blog.html?slug=${post.slug}" class="learn-more-btn">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Get posts for current page
    getCurrentPagePosts() {
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        return this.filteredPosts.slice(startIndex, endIndex);
    }

    // Calculate total pages
    getTotalPages() {
        return Math.ceil(this.filteredPosts.length / this.postsPerPage);
    }

    // Create pagination HTML
    createPaginationHTML() {
        const totalPages = this.getTotalPages();
        
        if (totalPages <= 1) {
            return '';
        }

        let paginationHTML = '<div class="col-lg-12 col-md-12"><div class="pagination-area">';
        
        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<a href="#" class="prev page-numbers" data-page="${this.currentPage - 1}"><i class="fas fa-angle-double-left"></i></a>`;
        } else {
            paginationHTML += `<span class="prev page-numbers disabled"><i class="fas fa-angle-double-left"></i></span>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<span class="page-numbers current" aria-current="page">${i}</span>`;
            } else {
                paginationHTML += `<a href="#" class="page-numbers" data-page="${i}">${i}</a>`;
            }
        }

        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<a href="#" class="next page-numbers" data-page="${this.currentPage + 1}"><i class="fas fa-angle-double-right"></i></a>`;
        } else {
            paginationHTML += `<span class="next page-numbers disabled"><i class="fas fa-angle-double-right"></i></span>`;
        }

        paginationHTML += '</div></div>';
        return paginationHTML;
    }

    // Render blog posts
    render() {
        const posts = this.getCurrentPagePosts();
        
        let html = '';
        posts.forEach(post => {
            html += this.createBlogPostHTML(post);
        });

        // Add pagination
        html += this.createPaginationHTML();

        this.container.innerHTML = html;

        // Attach pagination event listeners
        this.attachPaginationListeners();
    }

    // Attach event listeners to pagination buttons
    attachPaginationListeners() {
        const paginationButtons = this.container.querySelectorAll('.page-numbers');
        
        paginationButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(button.getAttribute('data-page'));
                if (page && page !== this.currentPage) {
                    this.goToPage(page);
                }
            });
        });
    }

    // Navigate to specific page
    goToPage(page) {
        const totalPages = this.getTotalPages();
        if (page < 1 || page > totalPages) {
            return;
        }

        this.currentPage = page;
        this.render();

        // Scroll to top of blog section
        const blogSection = document.querySelector('.blog-area');
        if (blogSection) {
            blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    

    // Get featured posts
    getFeaturedPosts(limit = 3) {
        return this.allPosts.filter(post => post.featured).slice(0, limit);
    }

    // Get recent posts
    getRecentPosts(limit = 5) {
        return this.allPosts.slice(0, limit);
    }

    // Get post by slug
    getPostBySlug(slug) {
        return this.allPosts.find(post => post.slug === slug);
    }
}

// Initialize blog when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog manager if blog grid exists
    const blogGrid = document.getElementById('blog-posts-grid');
    if (blogGrid) {
        window.blogManager = new BlogManager('blog-posts-grid', 6);
    }
});
