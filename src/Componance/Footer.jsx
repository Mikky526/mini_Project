import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">🍽️ FoodieExpress</h3>
                        <p className="text-gray-300 text-sm">
                            Delicious food delivered fresh to your doorstep. 
                            Experience the best flavors from around the world.
                        </p>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Menu</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    
                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Main Course</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Appetizers</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Desserts</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Beverages</a></li>
                        </ul>
                    </div>
                    
                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <div className="space-y-2 text-gray-300 text-sm">
                            <p>📞 +91 98765 43210</p>
                            <p>📧 info@foodieexpress.com</p>
                            <p>📍 123 Food Street, Delhi, India</p>
                            <div className="flex space-x-4 mt-4">
                                <a href="#" className="text-gray-300 hover:text-white">📘</a>
                                <a href="#" className="text-gray-300 hover:text-white">📷</a>
                                <a href="#" className="text-gray-300 hover:text-white">🐦</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p className="text-gray-300 text-sm">
                        © 2025 FoodieExpress. All rights reserved. | 
                        <a href="#" className="hover:text-white ml-1">Privacy Policy</a> | 
                        <a href="#" className="hover:text-white ml-1">Terms of Service</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
