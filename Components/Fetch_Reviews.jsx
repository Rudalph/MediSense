"use client"
import { useState, useEffect } from "react";
import { contract } from "../utils/web3";
import { Search, Star, Clock, Calendar, User, FileText, Pill, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";

const FetchReviews = () => {
    const [medicineName, setMedicineName] = useState("");
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [sentimentResults, setSentimentResults] = useState({
        positive: 0,
        neutral: 0,
        negative: 0,
        overallSentiment: "",
        compoundScore: 0
    });

    // Simplified sentiment analyzer similar to VADER
    const analyzeSentiment = (text) => {
        // This is a simple implementation that mimics VADER behavior
        // Positive and negative word lists
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'helpful', 'effective', 'works', 'recommend', 'relief', 'better', 'best', 'improvement', 'happy', 'satisfied', 'perfect', 'love', 'like', 'comfortable'];
        const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'poor', 'worst', 'difficult', 'ineffective', 'useless', 'disappointing', 'painful', 'sick', 'worse', 'side effects', 'expensive', 'waste', 'not recommend', 'avoid', 'hate', 'dislike'];
        
        // Convert to lowercase for matching
        const lowercaseText = text.toLowerCase();
        
        // Count matches
        let positiveCount = 0;
        let negativeCount = 0;
        
        positiveWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = lowercaseText.match(regex);
            if (matches) positiveCount += matches.length;
        });
        
        negativeWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = lowercaseText.match(regex);
            if (matches) negativeCount += matches.length;
        });
        
        // Calculate scores similar to VADER
        const pos = positiveCount / (positiveCount + negativeCount + 10) * 100;
        const neg = negativeCount / (positiveCount + negativeCount + 10) * 100;
        const neu = 100 - (pos + neg);
        
        // Compound score between -1 and 1
        let compound = (positiveCount - negativeCount) / ((positiveCount + negativeCount) || 1);
        compound = Math.max(-1, Math.min(1, compound)); // Bound between -1 and 1
        
        // Determine sentiment label
        let sentiment = "Neutral";
        if (compound > 0.05) sentiment = "Positive";
        else if (compound < -0.05) sentiment = "Negative";
        
        return {
            pos: pos.toFixed(1),
            neg: neg.toFixed(1),
            neu: neu.toFixed(1),
            compound: compound.toFixed(2),
            sentiment
        };
    };

    const fetchReviews = async () => {
        try {
            setIsLoading(true);
            const result = await contract.methods.getReviewsByMedicineName(medicineName).call();
            
            // Convert BigInt values to numbers and format date, add sentiment analysis
            const formattedReviews = result.map(review => {
                const sentimentResult = analyzeSentiment(review.reviewText);
                return {
                    genericName: review.genericName,
                    rating: Number(review.rating),
                    reviewText: review.reviewText,
                    date: new Date(Number(review.date) * 1000).toLocaleDateString(),
                    time: new Date(Number(review.time) * 1000).toLocaleTimeString(),
                    reviewer: review.reviewer,
                    sentiment: sentimentResult
                };
            });

            setReviews(formattedReviews);
            setHasSearched(true);
            
            // Calculate aggregate sentiment
            calculateAggregateSentiment(formattedReviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            alert("Failed to fetch reviews. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const calculateAggregateSentiment = (reviewsWithSentiment) => {
        if (reviewsWithSentiment.length === 0) {
            setSentimentResults({
                positive: 0,
                neutral: 0,
                negative: 0,
                overallSentiment: "No Data",
                compoundScore: 0
            });
            return;
        }
        
        let positiveCount = 0;
        let neutralCount = 0;
        let negativeCount = 0;
        let totalCompound = 0;
        
        reviewsWithSentiment.forEach(review => {
            if (review.sentiment.sentiment === "Positive") positiveCount++;
            else if (review.sentiment.sentiment === "Negative") negativeCount++;
            else neutralCount++;
            
            totalCompound += parseFloat(review.sentiment.compound);
        });
        
        const avgCompound = totalCompound / reviewsWithSentiment.length;
        
        // Determine overall sentiment
        let overallSentiment = "Neutral";
        if (avgCompound > 0.05) overallSentiment = "Positive";
        else if (avgCompound < -0.05) overallSentiment = "Negative";
        
        setSentimentResults({
            positive: positiveCount,
            neutral: neutralCount,
            negative: negativeCount,
            overallSentiment,
            compoundScore: avgCompound.toFixed(2)
        });
    };

    // Function to render star rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={16}
                    className={`${i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
            );
        }
        return <div className="flex">{stars}</div>;
    };

    // Get sentiment icon
    const getSentimentIcon = (sentiment) => {
        switch(sentiment) {
            case "Positive":
                return <ThumbsUp className="text-green-500" size={18} />;
            case "Negative":
                return <ThumbsDown className="text-red-500" size={18} />;
            default:
                return <AlertCircle className="text-gray-400" size={18} />;
        }
    };

    // Get sentiment color
    const getSentimentColor = (sentiment) => {
        switch(sentiment) {
            case "Positive":
                return "text-green-600 bg-green-50 border-green-200";
            case "Negative":
                return "text-red-600 bg-red-50 border-red-200";
            default:
                return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 pt-36 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-[#1A2238] to-[#1A2238] py-6 px-8">
                        <h2 className="text-2xl font-bold text-white flex items-center">
                            <FileText className="mr-2" />
                            View Medicine Reviews with Sentiment Analysis
                        </h2>
                    </div>
                    
                    <div className="p-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-grow">
                                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Pill className="mr-2 text-[#1A2238]" size={16} />
                                    Select Medicine
                                </label>
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
                            
                            <div className="flex items-end">
                                <button 
                                    onClick={fetchReviews}
                                    disabled={isLoading || !medicineName}
                                    className={`py-3 px-6 rounded-md font-medium flex items-center justify-center transition-all duration-300 ${
                                        !medicineName
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-[#D45028] text-white hover:bg-[#1A2238] hover:shadow-md transform hover:-translate-y-1"
                                    }`}
                                >
                                    <Search className={`mr-2 ${isLoading ? "animate-spin" : ""}`} size={18} />
                                    {isLoading ? "Analyzing..." : "Fetch & Analyze"}
                                </button>
                            </div>
                        </div>
                        
                        {/* Sentiment Analysis Summary */}
                        {hasSearched && reviews.length > 0 && (
                            <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                    <FileText className="mr-2 text-[#1A2238]" size={18} />
                                    Sentiment Analysis Summary
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <ThumbsUp className="text-green-500 mr-2" size={18} />
                                                <span className="font-medium text-green-700">Positive</span>
                                            </div>
                                            <span className="text-lg font-bold text-green-600">{sentimentResults.positive}</span>
                                        </div>
                                        <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                                            <div 
                                                className="bg-green-500 h-2 rounded-full" 
                                                style={{ width: `${(sentimentResults.positive / reviews.length) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <AlertCircle className="text-gray-400 mr-2" size={18} />
                                                <span className="font-medium text-gray-700">Neutral</span>
                                            </div>
                                            <span className="text-lg font-bold text-gray-600">{sentimentResults.neutral}</span>
                                        </div>
                                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-gray-500 h-2 rounded-full" 
                                                style={{ width: `${(sentimentResults.neutral / reviews.length) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <ThumbsDown className="text-red-500 mr-2" size={18} />
                                                <span className="font-medium text-red-700">Negative</span>
                                            </div>
                                            <span className="text-lg font-bold text-red-600">{sentimentResults.negative}</span>
                                        </div>
                                        <div className="mt-2 w-full bg-red-200 rounded-full h-2">
                                            <div 
                                                className="bg-red-500 h-2 rounded-full" 
                                                style={{ width: `${(sentimentResults.negative / reviews.length) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-4 p-4 rounded-lg border flex items-center justify-between bg-gray-50">
                                    <div className="flex items-center">
                                        <div className={`mr-3 p-2 rounded-full ${
                                            sentimentResults.overallSentiment === "Positive" ? "bg-green-100" : 
                                            sentimentResults.overallSentiment === "Negative" ? "bg-red-100" : "bg-gray-100"
                                        }`}>
                                            {getSentimentIcon(sentimentResults.overallSentiment)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Overall Sentiment</h4>
                                            <p className="text-sm text-gray-600">Based on {reviews.length} reviews</p>
                                        </div>
                                    </div>
                                    <div className={`px-4 py-2 rounded-lg font-bold ${
                                        sentimentResults.overallSentiment === "Positive" ? "text-green-600 bg-green-50" : 
                                        sentimentResults.overallSentiment === "Negative" ? "text-red-600 bg-red-50" : "text-gray-600 bg-gray-50"
                                    }`}>
                                        {sentimentResults.overallSentiment}
                                        <span className="ml-2 text-sm font-normal">({sentimentResults.compoundScore})</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="mt-6">
                            {isLoading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-pulse flex flex-col items-center">
                                        <Search size={48} className="text-[#1A2238] animate-bounce" />
                                        <p className="mt-4 text-gray-600">Analyzing reviews...</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {hasSearched && (
                                        <div className="mb-4">
                                            <h3 className="text-lg font-medium text-gray-800">
                                                {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"} for {medicineName}
                                            </h3>
                                        </div>
                                    )}
                                    
                                    {reviews.length > 0 ? (
                                        <div className="space-y-6">
                                            {reviews.map((review, index) => (
                                                <div 
                                                    key={index} 
                                                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                                                >
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                                        <div className="flex items-center mb-2 sm:mb-0">
                                                            <Pill className="text-[#1A2238] mr-2" size={16} />
                                                            <span className="text-sm font-medium text-gray-600">
                                                                Generic Name: <span className="text-gray-800">{review.genericName}</span>
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center text-sm text-gray-600">
                                                                <Calendar className="text-[#D45028] mr-1" size={14} />
                                                                {review.date}
                                                            </div>
                                                            <div className="flex items-center text-sm text-gray-600">
                                                                <Clock className="text-[#D45028] mr-1" size={14} />
                                                                {review.time}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center mb-3">
                                                        <span className="text-sm font-medium text-gray-600 mr-2">Rating:</span>
                                                        {renderStars(review.rating)}
                                                        <span className="ml-2 text-sm text-gray-500">({review.rating}/5)</span>
                                                    </div>
                                                    
                                                    <div className="mb-4">
                                                        <p className="text-gray-800 whitespace-pre-wrap">{review.reviewText}</p>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap items-center justify-between">
                                                        <div className="flex items-center text-sm text-gray-500 mb-2 sm:mb-0">
                                                            <User className="text-[#1A2238] mr-2" size={14} />
                                                            <span className="font-medium">Reviewer:</span>
                                                            <span className="ml-1 text-xs text-gray-500 truncate">
                                                                {review.reviewer.substring(0, 6)}...{review.reviewer.substring(review.reviewer.length - 4)}
                                                            </span>
                                                        </div>
                                                        
                                                        <div className={`px-3 py-1 rounded-full flex items-center text-sm border ${getSentimentColor(review.sentiment.sentiment)}`}>
                                                            {getSentimentIcon(review.sentiment.sentiment)}
                                                            <span className="ml-1 font-medium">{review.sentiment.sentiment}</span>
                                                            <span className="ml-1 text-xs opacity-70">({review.sentiment.compound})</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        hasSearched && (
                                            <div className="text-center py-10 border border-gray-200 rounded-lg">
                                                <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                                                <p className="text-gray-500">No reviews found for {medicineName}</p>
                                                <p className="text-sm text-gray-400 mt-2">Try searching for a different medicine</p>
                                            </div>
                                        )
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FetchReviews;