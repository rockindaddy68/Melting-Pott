import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const EventReviewsViewer = ({ selectedLanguage = 'DE' }) => {
  const { theme } = useTheme();
  const [events, setEvents] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const translations = {
    DE: {
      title: "🏭 Ruhrgebiet Events & Reviews",
      loading: "Lade Events und Reviews...",
      events: "Events",
      reviews: "Bewertungen", 
      reviewsCount: "Bewertungen",
      free: "Kostenlos",
      from: "aus",
      verified: "Verifiziert",
      noReviews: "Noch keine Bewertungen für dieses Event"
    },
    EN: {
      title: "🏭 Ruhr Area Events & Reviews",
      loading: "Loading Events and Reviews...",
      events: "Events",
      reviews: "Reviews",
      reviewsCount: "Reviews", 
      free: "Free",
      from: "from",
      verified: "Verified",
      noReviews: "No reviews yet for this event"
    },
    TR: {
      title: "🏭 Ruhr Bölgesi Etkinlikler & Değerlendirmeler",
      loading: "Etkinlikler ve Değerlendirmeler yükleniyor...",
      events: "Etkinlikler",
      reviews: "Değerlendirmeler",
      reviewsCount: "Değerlendirmeler",
      free: "Ücretsiz", 
      from: "dan",
      verified: "Doğrulanmış",
      noReviews: "Bu etkinlik için henüz değerlendirme yok"
    },
    PL: {
      title: "🏭 Wydarzenia i Recenzje Zagłębia Ruhry",
      loading: "Ładowanie wydarzeń i recenzji...",
      events: "Wydarzenia",
      reviews: "Recenzje",
      reviewsCount: "Recenzje",
      free: "Bezpłatne",
      from: "z",
      verified: "Zweryfikowane", 
      noReviews: "Brak recenzji dla tego wydarzenia"
    },
    RU: {
      title: "🏭 События и Отзывы Рурской области",
      loading: "Загрузка событий и отзывов...",
      events: "События",
      reviews: "Отзывы",
      reviewsCount: "Отзывы",
      free: "Бесплатно",
      from: "из",
      verified: "Проверено",
      noReviews: "Пока нет отзывов для этого события"
    },
    AR: {
      title: "🏭 أحداث ومراجعات منطقة الرور",
      loading: "تحميل الأحداث والمراجعات...",
      events: "الأحداث", 
      reviews: "المراجعات",
      reviewsCount: "المراجعات",
      free: "مجاني",
      from: "من",
      verified: "تم التحقق",
      noReviews: "لا توجد مراجعات حتى الآن لهذا الحدث"
    },
    IT: {
      title: "🏭 Eventi e Recensioni della Ruhr",
      loading: "Caricamento eventi e recensioni...",
      events: "Eventi",
      reviews: "Recensioni",
      reviewsCount: "Recensioni",
      free: "Gratuito",
      from: "da",
      verified: "Verificato",
      noReviews: "Nessuna recensione ancora per questo evento"
    },
    NL: {
      title: "🏭 Ruhrgebied Evenementen & Beoordelingen",
      loading: "Evenementen en beoordelingen laden...",
      events: "Evenementen",
      reviews: "Beoordelingen",
      reviewsCount: "Beoordelingen",
      free: "Gratis",
      from: "uit",
      verified: "Geverifieerd",
      noReviews: "Nog geen beoordelingen voor dit evenement"
    },
    FR: {
      title: "🏭 Événements et Avis de la Ruhr",
      loading: "Chargement des événements et avis...",
      events: "Événements",
      reviews: "Avis",
      reviewsCount: "Avis",
      free: "Gratuit",
      from: "de",
      verified: "Vérifié",
      noReviews: "Pas encore d'avis pour cet événement"
    },
    ES: {
      title: "🏭 Eventos y Reseñas del Ruhr",
      loading: "Cargando eventos y reseñas...",
      events: "Eventos",
      reviews: "Reseñas",
      reviewsCount: "Reseñas",
      free: "Gratis",
      from: "desde",
      verified: "Verificado",
      noReviews: "Aún no hay reseñas para este evento"
    }
  }

  const t = translations[selectedLanguage] || translations.DE;

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
        <p className="mt-4 text-gray-600">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto p-6 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {t.title}
        </h1>
        <p className={`${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {events.length} {t.events} • {reviews.length} {t.reviews}
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
                    💰 {event.price === 0 ? t.free : `€${event.price}`}
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
                    💬 {t.reviewsCount} ({eventReviews.length})
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
                              {t.from} {review.userCity}
                            </span>
                            {review.isVerified && (
                              <span className="text-green-500 text-xs">✓ {t.verified}</span>
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
                  <p>{t.noReviews}</p>
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