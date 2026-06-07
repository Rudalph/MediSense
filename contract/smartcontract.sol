// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineReviews {
    struct Review {
        string genericName;
        uint8 rating; // 1-5
        string reviewText;
        uint256 date;
        uint256 time;
        address reviewer;
    }

    mapping(string => Review[]) private medicineReviews;

    event ReviewSubmitted(
        string indexed medicineName,
        string genericName,
        uint8 rating,
        string reviewText,
        uint256 date,
        uint256 time,
        address reviewer
    );

    function submitReview(
        string memory _medicineName,
        string memory _genericName,
        uint8 _rating,
        string memory _reviewText
    ) public {
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
        require(bytes(_medicineName).length > 0, "Medicine name cannot be empty");
        require(bytes(_reviewText).length > 0, "Review text cannot be empty");

        medicineReviews[_medicineName].push(
            Review({
                genericName: _genericName,
                rating: _rating,
                reviewText: _reviewText,
                date: block.timestamp,
                time: block.timestamp,
                reviewer: msg.sender
            })
        );

        emit ReviewSubmitted(
            _medicineName,
            _genericName,
            _rating,
            _reviewText,
            block.timestamp,
            block.timestamp,
            msg.sender
        );
    }

    function getReviewsByMedicineName(string memory _medicineName)
        public
        view
        returns (Review[] memory)
    {
        return medicineReviews[_medicineName];
    }
}
