// Blog Posts Data
const blogPosts = [
    {
        id: 1,
        title: "The Future of HealthTech: Digital Transformation in Healthcare",
        excerpt: "Explore how digital innovation is revolutionizing healthcare delivery, from telemedicine to AI diagnostics. Discover the key trends shaping the future of patient care and healthcare operations...",
        image: "assets/img/blog/blog1.jpg",
        author: "Admin",
        date: "January 15, 2026",
        slug: "future-of-healthtech-digital-transformation",
        category: "HealthTech",
        featured: true
    },
    {
        id: 2,
        title: "FinTech Revolution: Transforming Financial Services Through Innovation",
        excerpt: "Discover how FinTech is reshaping banking, payments, and financial inclusion. Learn about emerging technologies driving the future of finance and what it means for businesses...",
        image: "assets/img/blog/blog-2.jpg",
        author: "Admin",
        date: "January 22, 2026",
        slug: "fintech-revolution-financial-services-innovation",
        category: "FinTech",
        featured: true
    },
    {
        id: 3,
        title: "MHINO Virtual Wallet: Empowering Financial Independence in Healthcare",
        excerpt: "Learn how MHINO's innovative virtual wallet system is transforming personal health budgets, enabling choice and control for care recipients while ensuring transparency and compliance...",
        image: "assets/img/blog/blog3.png",
        author: "Admin",
        date: "February 5, 2026",
        slug: "mhino-virtual-wallet-healthcare-financial-independence",
        category: "HealthTech",
        featured: true
    },
    {
        id: 4,
        title: "Cyber Essentials & G-Cloud Framework: Your Path to Secure Compliance",
        excerpt: "Understanding Cyber Essentials, Cyber Essentials Plus, and G-Cloud Framework compliance. Essential guidance for organizations looking to meet government security standards and win public sector contracts...",
        image: "assets/img/blog/blog4.jpg",
        author: "Admin",
        date: "February 18, 2026",
        slug: "cyber-essentials-g-cloud-compliance-security",
        category: "Compliance",
        featured: true
    },
    {
        id: 5,
        title: "AI Automation in Healthcare: Enhancing Patient Care and Operational Efficiency",
        excerpt: "Explore how artificial intelligence is automating healthcare processes, from administrative tasks to clinical decision support. Discover the benefits, challenges, and real-world applications...",
        image: "assets/img/blog/blog5.jpg",
        author: "Admin",
        date: "March 3, 2026",
        slug: "ai-automation-healthcare-patient-care-efficiency",
        category: "AI & Healthcare",
        featured: true
    },
    {
        id: 6,
        title: "Digital Innovation in Government: Modernizing Public Services for Citizens",
        excerpt: "How government organizations are leveraging digital transformation to improve citizen services, increase transparency, and enhance operational efficiency. Real strategies and success stories...",
        image: "assets/img/blog/blog6.jpeg",
        author: "Admin",
        date: "March 17, 2026",
        slug: "digital-innovation-government-public-services",
        category: "GovTech",
        featured: true
    },
    {
        id: 7,
        title: "PHB Wallets for Local Authorities and ICBs: Enabling Choice and Control",
        excerpt: "Understanding Personal Health Budget wallets for Integrated Care Boards and Local Authorities. Learn how digital PHB solutions are transforming care delivery and empowering service users...",
        image: "assets/img/blog/blog7.jpg",
        author: "Admin",
        date: "April 2, 2026",
        slug: "phb-wallets-local-authorities-icbs-choice-control",
        category: "Healthcare Management",
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
                            <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 320px; object-fit: cover;">
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
