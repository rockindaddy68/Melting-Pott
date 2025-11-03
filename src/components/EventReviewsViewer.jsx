import React, { useState, useEffect } from 'react';

const EventReviewsViewer = () => {
  const [events, setEvents] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Events laden
      const eventsRes = await fetch('http://localhost:5000/api/events');
      const eventsData = await eventsRes.json();
      
      // Reviews laden  
      const reviewsRes = await fetch('http://localhost:5000/api/reviews');
      const reviewsData = await reviewsRes.json();
      
      setEvents(eventsData.events || []);
      setReviews(reviewsData.reviews || []);
      setLoading(false);
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error);
      setLoading(false);
    }
  };

  const getReviewsForEvent = (eventId) => {
    return reviews.filter(review => review.eventId === eventId);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Lade Events und Reviews...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🏭 Ruhrgebiet Events & Reviews
        </h1>
        <p className="text-gray-600">
          {events.length} Events • {reviews.length} Bewertungen
        </p>
      </div>

      <div className="grid gap-8">
        {events.map(event => {
          const eventReviews = getReviewsForEvent(event._id);
          const avgRating = eventReviews.length > 0 
            ? eventReviews.reduce((sum, r) => sum + r.rating, 0) / eventReviews.length 
            : 0;

          return (
            <div key={event._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Event Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
                <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    📍 {event.city}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    🏷️ {event.category}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    💰 {event.price === 0 ? 'Kostenlos' : `€${event.price}`}
                  </span>
                  {avgRating > 0 && (
                    <span className="bg-white/20 px-3 py-1 rounded-full">
                      {renderStars(Math.round(avgRating))} ({eventReviews.length})
                    </span>
                  )}
                </div>
                <p className="mt-3 text-white/90">{event.description}</p>
              </div>

              {/* Reviews */}
              {eventReviews.length > 0 ? (
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    💬 Bewertungen ({eventReviews.length})
                  </h3>
                  <div className="space-y-4">
                    {eventReviews.map(review => (
                      <div key={review._id} className="border-l-4 border-orange-500 pl-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800">
                              {review.userName}
                            </span>
                            <span className="text-gray-500 text-sm">
                              aus {review.userCity}
                            </span>
                            {review.isVerified && (
                              <span className="text-green-500 text-xs">✓ Verifiziert</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{renderStars(review.rating)}</span>
                            <span className="text-gray-400 text-sm">
                              ❤️ {review.likes}
                            </span>
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {review.title}
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {review.review}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(review.createdAt).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <p>Noch keine Bewertungen für dieses Event</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventReviewsViewer;