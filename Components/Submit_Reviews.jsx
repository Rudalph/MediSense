"use client"
import { useState } from "react";
import { contract, web3 } from "../utils/web3";
import { Star, Send, Pill, FileText } from "lucide-react";

const SubmitReview = () => {
    const [medicineName, setMedicineName] = useState("");
    const [genericName, setGenericName] = useState("");
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // const submitReview = async () => {
    //     try {
    //         setIsSubmitting(true);
    //         const accounts = await web3.eth.requestAccounts();
    //         await contract.methods
    //             .submitReview(medicineName, genericName, rating, reviewText)
    //             .send({ from: accounts[0] });
    //         alert("Review submitted successfully!");
            
    //         // Reset form
    //         setMedicineName("");
    //         setGenericName("");
    //         setRating(1);
    //         setReviewText("");
    //     } catch (error) {
    //         console.error("Error submitting review:", error);
    //         alert("Failed to submit review. Please try again.");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    const submitReview = async () => {
        try {
            setIsSubmitting(true);
    
            const reviewData = {
                medicineName,
                genericName,
                rating,
                reviewText,
            };
    
            const response = await fetch("/api/contract_api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData),
            });
    
            const data = await response.json();
    
            if (data.success) {
                alert("Review submitted successfully! Transaction Hash: " + data.transactionHash);
    
                // Reset form
                setMedicineName("");
                setGenericName("");
                setRating(1);
                setReviewText("");
            } else {
                throw new Error(data.error || "Transaction failed");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    

    // Generate star rating UI
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i)}
                    className={`transition-all duration-200 ${
                        i <= rating ? "text-yellow-400 scale-110" : "text-gray-300"
                    }`}
                    aria-label={`Rate ${i} stars`}
                >
                    <Star className="w-8 h-8 fill-current" />
                </button>
            );
        }
        return stars;
    };

    return (
        <div className="min-h-screen bg-slate-100 pt-36 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
                <div className="bg-gradient-to-r from-[#1A2238] to-[#1A2238] py-6 px-8">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <FileText className="mr-2" />
                        Submit a Medicine Review
                    </h2>
                </div>
                
                <div className="p-8">
                    <div className="space-y-6">
                        {/* Medicine Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <Pill className="mr-2 text-[#1A2238]" size={16} />
                                Medicine Name
                            </label>
                            <div className="relative">
                                <select 
                                    value={medicineName}
                                    onChange={(e) => setMedicineName(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 border py-3 px-4 bg-white focus:border-[#D45028] focus:ring-[#D45028] transition-all duration-200 text-gray-700"
                                >
                                    <option value="" disabled>Select Medicine</option>
                                    <option value="Paracetamol">Paracetamol</option>
                                    <option value="Ibuprofen">Ibuprofen</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Generic Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <Pill className="mr-2 text-[#1A2238]" size={16} />
                                Generic Name
                            </label>
                            <div className="relative">
                                <select 
                                    value={genericName}
                                    onChange={(e) => setGenericName(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 border py-3 px-4 bg-white focus:border-[#D45028] focus:ring-[#D45028] transition-all duration-200 text-gray-700"
                                >
                                    <option value="" disabled>Select Generic Name</option>
                                    <option value="Acetaminophen">Acetaminophen</option>
                                    <option value="NSAID">NSAID</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Rating */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <Star className="mr-2 text-[#1A2238]" size={16} />
                                Rating
                            </label>
                            <div className="flex items-center space-x-1">
                                {renderStars()}
                            </div>
                        </div>
                        
                        {/* Review Text */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <FileText className="mr-2 text-[#1A2238]" size={16} />
                                Your Review
                            </label>
                            <textarea 
                                value={reviewText} 
                                onChange={(e) => setReviewText(e.target.value)} 
                                placeholder="Write your review here..."
                                rows={4}
                                className="block w-full rounded-md border-gray-300 border py-3 px-4 bg-white focus:border-[#D45028] focus:ring-[#D45028] transition-all duration-200 text-gray-700 resize-none"
                            ></textarea>
                        </div>
                        
                        {/* Submit Button */}
                        <div className="pt-2">
                            <button 
                                onClick={submitReview}
                                disabled={isSubmitting || !medicineName || !genericName || !reviewText}
                                className={`w-full py-3 px-4 rounded-md bg-[#D45028] text-white font-medium flex items-center justify-center transition-all duration-300 ${
                                    isSubmitting || !medicineName || !genericName || !reviewText
                                        ? "opacity-70 cursor-not-allowed"
                                        : "hover:bg-[#1A2238] hover:shadow-md transform hover:-translate-y-1"
                                }`}
                            >
                                <Send className={`mr-2 ${isSubmitting ? "animate-pulse" : ""}`} size={18} />
                                {isSubmitting ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitReview;