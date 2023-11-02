import { NextRequest, NextResponse } from 'next/server';
import { deleteReviewById } from '../../../../database/reviews';
import { Review } from '../../../../migrations/00006-createTableReviews';
import { Error } from '../route';

type ReviewResponseBodyDelete = { review: Review } | Error;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<ReviewResponseBodyDelete>> {
  const reviewId = Number(params.reviewId);

  if (!reviewId) {
    return NextResponse.json(
      {
        error: 'Review id is not valid',
      },
      { status: 400 },
    );
  }

  const review = await deleteReviewById(reviewId);

  if (!review) {
    return NextResponse.json(
      {
        error: 'Review Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ review: review });
}
