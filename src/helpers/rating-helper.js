export default function showRatingHelper(rating) {
    return '&#x2605'.repeat(Math.trunc(rating));
}