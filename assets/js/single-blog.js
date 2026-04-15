// Single Blog Post Dynamic Loader
// This script loads blog post content dynamically based on URL slug parameter

// Extended blog posts data with full content
// Note: This should match the data in blog-posts.js but includes fullContent
const blogPostsFullContent = [
    {
        id: 1,
        title: "Making The Feast Or Famine Of Freelancing",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        image: "assets/img/blog/blog-1.png",
        author: "Olivia Rhye",
        authorImage: "assets/img/team/team-2.png",
        // date: "August 15, 2025",
        slug: "making-the-feast-or-famine-of-freelancing",
        category: "Product Designer",
        tags: ["Freelancing", "Business", "Tips"],
        featured: true,
        introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        fullContent: `
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            
            <blockquote class="blockquote">
                <p>"In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear."</p>
                <footer>— Someone famous</footer>
            </blockquote>
            
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            
            <h3>Software and tools</h3>
            <p>Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.</p>
            
            <ul>
                <li>Better understand your users</li>
                <li>Improve your customer service</li>
                <li>Increase productivity and efficiency</li>
                <li>Make informed business decisions</li>
            </ul>
            
            <h3>Conclusion</h3>
            <p>High-performance is about applying the best future. We help startups and enterprises achieve it by taking an engineering-first approach to delivering modern, scalable products. From the first day until the last, we are an integrated part of your team.</p>
        `
    },
    {
        id: 2,
        title: "I Used The Web For A Day On A 50 MB Budget",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        image: "assets/img/blog/blog-2.png",
        author: "Admin",
        authorImage: "assets/img/user-analysis/banner/circle-shape-1.png",
        // date: "August 15, 2025",
        slug: "i-used-the-web-for-a-day-on-50mb-budget",
        category: "Technology",
        tags: ["Web", "Technology", "Experiment"],
        featured: true,
        introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        fullContent: `
            <p>Testing the limits of web browsing with minimal data usage reveals fascinating insights about modern web design and optimization.</p>
            
            <h3>The Challenge</h3>
            <p>With only 50MB of data for an entire day, every byte counts. This experiment showcases how much we take unlimited data for granted.</p>
            
            <h3>Key Findings</h3>
            <ul>
                <li>Modern websites are incredibly data-heavy</li>
                <li>Images and videos consume the most bandwidth</li>
                <li>Text-based sites are surprisingly efficient</li>
                <li>Mobile optimization makes a huge difference</li>
            </ul>
            
            <p>This experience highlights the importance of web optimization and accessibility for users with limited connectivity.</p>
        `
    },
    {
        id: 3,
        title: "Here are the 5 most telling signs of micromanagement",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        image: "assets/img/blog/blog-3.png",
        author: "Admin",
        authorImage: "assets/img/user-analysis/banner/circle-shape-1.png",
        // date: "August 15, 2025",
        slug: "5-signs-of-micromanagement",
        category: "Management",
        tags: ["Management", "Leadership", "Business"],
        featured: true,
        introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        fullContent: `
            <p>Micromanagement can stifle creativity and productivity. Here are five warning signs that you or someone in your organization might be micromanaging.</p>
            
            <h3>1. Constant Oversight</h3>
            <p>Managers who need to approve every small decision show a lack of trust in their team members.</p>
            
            <h3>2. Excessive Reporting Requirements</h3>
            <p>Requiring frequent status updates beyond what's necessary indicates micromanagement tendencies.</p>
            
            <h3>3. Reluctance to Delegate</h3>
            <p>If a manager can't let go of tasks, it prevents team growth and creates bottlenecks.</p>
            
            <h3>4. Focus on Process Over Results</h3>
            <p>Being overly concerned with how work is done rather than the outcomes achieved.</p>
            
            <h3>5. Low Team Morale</h3>
            <p>Micromanagement often leads to decreased job satisfaction and high turnover rates.</p>
            
            <p>Building trust and empowering team members leads to better results and a healthier work environment.</p>
        `
    },
    {
        id: 4,
        title: "Add And Show Image With Size From Elementor Widget",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        image: "assets/img/blog/blog-2.png",
        author: "Admin",
        authorImage: "assets/img/user-analysis/banner/circle-shape-1.png",
        // date: "August 15, 2025",
        slug: "elementor-widget-image-size",
        category: "Development",
        tags: ["WordPress", "Elementor", "Tutorial"],
        featured: true,
        introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        fullContent: `
            <p>Learn how to properly handle image sizes in custom Elementor widgets for optimal performance and display.</p>
            
            <h3>Understanding Image Sizes in WordPress</h3>
            <p>WordPress generates multiple image sizes when you upload media. Understanding these sizes is crucial for performance optimization.</p>
            
            <h3>Implementation Steps</h3>
            <ol>
                <li>Register your custom image size</li>
                <li>Add image control to your widget</li>
                <li>Retrieve and display the appropriate size</li>
                <li>Implement responsive image loading</li>
            </ol>
            
            <p>This approach ensures your images load quickly while maintaining quality across different devices.</p>
        `
    },
    {
        id: 5,
        title: "How To The Active Menu Based On URL In Next.JS?",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        image: "assets/img/blog/blog-2.png",
        author: "Admin",
        authorImage: "assets/img/user-analysis/banner/circle-shape-1.png",
        // date: "August 15, 2025",
        slug: "active-menu-nextjs",
        category: "Development",
        tags: ["Next.js", "React", "JavaScript"],
        featured: true,
        introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        fullContent: `
            <p>Creating dynamic navigation menus that highlight the current page is essential for good user experience in Next.js applications.</p>
            
            <h3>Using useRouter Hook</h3>
            <p>Next.js provides the useRouter hook which gives you access to the current route information.</p>
            
            <h3>Implementation Example</h3>
            <pre><code>
              import { useRouter } from 'next/router';

              const Navigation = () => {
                const router = useRouter();
                
                return (
                  &lt;nav&gt;
                    &lt;Link href="/"&gt;
                      &lt;a className={router.pathname === "/" ? "active" : ""}&gt;
                        Home
                      &lt;/a&gt;
                    &lt;/Link&gt;
                  &lt;/nav&gt;
                );
              };
            </code></pre>
            
            <p>This pattern works perfectly with Next.js's file-based routing system.</p>
        `
    },
    {
        id: 6,
        title: "Instagram Feed Add To Your WordPress Site",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
        image: "assets/img/blog/blog-3.png",
        author: "Admin",
        authorImage: "assets/img/user-analysis/banner/circle-shape-1.png",
        // date: "August 15, 2025",
        slug: "instagram-feed-wordpress",
        category: "WordPress",
        tags: ["WordPress", "Instagram", "Social Media"],
        featured: true,
        introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        fullContent: `
            <p>Integrating Instagram feeds into your WordPress site can boost engagement and showcase your social media presence.</p>
            
            <h3>Why Add Instagram to WordPress?</h3>
            <ul>
                <li>Increase social proof</li>
                <li>Keep content fresh automatically</li>
                <li>Drive traffic to your Instagram account</li>
                <li>Enhance visual appeal of your site</li>
            </ul>
            
            <h3>Best Practices</h3>
            <p>Choose a responsive plugin, optimize image loading, and ensure the feed matches your site's design aesthetic.</p>
            
            <p>Remember to comply with Instagram's terms of service and API guidelines when implementing feeds.</p>
        `
    }
];

// Single Blog Post Manager
class SingleBlogManager {
    constructor() {
        this.currentPost = null;
        this.init();
    }

    init() {
        // Get slug from URL
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');

        if (slug) {
            this.loadPost(slug);
        } else {
            this.showError('No blog post specified');
        }
    }

    getPostBySlug(slug) {
        return blogPostsFullContent.find(post => post.slug === slug);
    }

    loadPost(slug) {
        this.currentPost = this.getPostBySlug(slug);

        if (this.currentPost) {
            this.renderPost();
        } else {
            this.showError('Blog post not found');
        }
    }

    renderPost() {
        const post = this.currentPost;

        // Update page title
        document.title = `${post.title} - Backyard Technology`;

        // Update breadcrumb
        const breadcrumbTitle = document.querySelector('.page-title-content h2');
        if (breadcrumbTitle) {
            breadcrumbTitle.textContent = post.title;
        }

        // Update blog title
        const blogTitle = document.getElementById('blog-post-title');
        if (blogTitle) {
            blogTitle.textContent = post.title;
        }

        const blogIntro = document.getElementById('blog-post-introduction');
        if (blogIntro) {
            blogIntro.textContent = post.introduction;
        }

        // Update blog meta
        const blogMeta = document.getElementById('blog-post-meta');
        if (blogMeta) {
            blogMeta.innerHTML = `
            <div style="display: flex; align-items: center; margin-right: 15px;">
              <img src="${post.authorImage}" alt="${post.author}" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 5px;">
                <div style="display: flex; flex-direction: column; font-weight: bold; font-size: 14px;">
                  <span><a href="#">${post.author}</a></span>
                  <span><a href="#">${post.category}</a></span>
                </div>
              </div>
            `;
        }

        // Update blog image
        const blogImage = document.getElementById('blog-post-image');
        if (blogImage) {
            blogImage.src = post.image;
            blogImage.alt = post.title;
        }

        // Update blog content
        const blogContent = document.getElementById('blog-post-content');
        if (blogContent) {
            blogContent.innerHTML = post.fullContent;
        }

        // Update tags
        if (post.tags && post.tags.length > 0) {
            const tagsContainer = document.getElementById('blog-post-tags');
            if (tagsContainer) {
                tagsContainer.innerHTML = post.tags.map(tag => 
                    `<li><a href="insights.html">${tag}</a></li>`
                ).join('');
            }
        }

        // Load related posts
        this.loadRelatedPosts(post.category, post.id);
    }

    loadRelatedPosts(category, currentPostId, limit = 3) {
        const relatedPosts = blogPostsFullContent
            .filter(post => post.category === category && post.id !== currentPostId)
            .slice(0, limit);

        const relatedContainer = document.getElementById('related-blog-posts');
        if (relatedContainer && relatedPosts.length > 0) {
            relatedContainer.innerHTML = relatedPosts.map(post => `
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
            `).join('');
        }
    }

    showError(message) {
        console.error(message);
        const blogContent = document.getElementById('blog-post-content');
        if (blogContent) {
            blogContent.innerHTML = `
                <div class="alert alert-warning">
                    <h3>Post Not Found</h3>
                    <p>${message}</p>
                    <a href="insights.html" class="btn btn-primary">Back to Blog</a>
                </div>
            `;
        }
    }

    // Get recent posts for sidebar
    getRecentPosts(limit = 5) {
        return blogPostsFullContent
            .filter(post => post.id !== this.currentPost?.id)
            .slice(0, limit);
    }

    // Get categories for sidebar
    getCategories() {
        const categories = {};
        blogPostsFullContent.forEach(post => {
            categories[post.category] = (categories[post.category] || 0) + 1;
        });
        return categories;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.singleBlogManager = new SingleBlogManager();
});
