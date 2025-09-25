const ContactSection = ({ selectedLanguage }) => {
  const content = {
    DE: {
      title: "Kontakt",
      subtitle: "Bleiben Sie in Verbindung",
      form: {
        name: "Name",
        email: "E-Mail",
        subject: "Betreff",
        message: "Nachricht",
        send: "Nachricht senden"
      },
      info: {
        title: "Kontaktinformationen",
        email: "ruhrpott.events@gmail.com",
        phone: "+49 (0) 234 567890",
        address: "Ruhrgebiet, NRW, Deutschland",
        social: "Folgen Sie uns"
      },
      eventbrite: {
        title: "Event Management",
        description: "Organisieren Sie Ihre eigenen Events über unsere Eventbrite-Integration:",
        button: "Event erstellen"
      }
    },
    EN: {
      title: "Contact",
      subtitle: "Get in Touch",
      form: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send Message"
      },
      info: {
        title: "Contact Information",
        email: "ruhrpott.events@gmail.com",
        phone: "+49 (0) 234 567890",
        address: "Ruhr Area, NRW, Germany",
        social: "Follow Us"
      },
      eventbrite: {
        title: "Event Management",
        description: "Organize your own events through our Eventbrite integration:",
        button: "Create Event"
      }
    },
    TR: {
      title: "İletişim",
      subtitle: "Bize Ulaşın",
      form: {
        name: "İsim",
        email: "E-posta",
        subject: "Konu",
        message: "Mesaj",
        send: "Mesaj Gönder"
      },
      info: {
        title: "İletişim Bilgileri",
        email: "ruhrpott.events@gmail.com",
        phone: "+49 (0) 234 567890",
        address: "Ruhr Bölgesi, NRW, Almanya",
        social: "Bizi Takip Edin"
      },
      eventbrite: {
        title: "Etkinlik Yönetimi",
        description: "Eventbrite entegrasyonumuz üzerinden kendi etkinliklerinizi düzenleyin:",
        button: "Etkinlik Oluştur"
      }
    }
  };

  const t = content[selectedLanguage] || content.DE;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier würde normalerweise das Formular verarbeitet werden
    alert(`${selectedLanguage === 'DE' ? 'Nachricht gesendet!' : selectedLanguage === 'EN' ? 'Message sent!' : 'Mesaj gönderildi!'}`);
  };

  return (
    <section id="contact" className="py-20 bg-zinc-900">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-300">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-orange-400 mb-2">
                  {t.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
                  placeholder={t.form.name}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-orange-400 mb-2">
                  {t.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
                  placeholder={t.form.email}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-orange-400 mb-2">
                  {t.form.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
                  placeholder={t.form.subject}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-orange-400 mb-2">
                  {t.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors resize-none"
                  placeholder={t.form.message}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-orange-500 transition-colors"
              >
                {t.form.send}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/20">
              <h3 className="text-xl font-semibold text-orange-400 mb-6">
                {t.info.title}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-400/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white">{t.info.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-400/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white">{t.info.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-400/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white">{t.info.address}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="text-lg font-medium text-orange-400 mb-4">
                  {t.info.social}
                </h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-orange-400/20 rounded-full flex items-center justify-center hover:bg-orange-400/30 transition-colors">
                    <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-orange-400/20 rounded-full flex items-center justify-center hover:bg-orange-400/30 transition-colors">
                    <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-orange-400/20 rounded-full flex items-center justify-center hover:bg-orange-400/30 transition-colors">
                    <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.397.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.738-1.378l-.742 2.833c-.269 1.041-1.016 2.339-1.509 3.135C9.33 23.641 10.552 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Eventbrite Integration */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/20">
              <h3 className="text-xl font-semibold text-orange-400 mb-4">
                {t.eventbrite.title}
              </h3>
              <p className="text-gray-300 mb-6">
                {t.eventbrite.description}
              </p>
              <a
                href="https://www.eventbrite.de/create"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-orange-400 text-black font-semibold rounded-lg hover:bg-orange-500 transition-colors"
              >
                {t.eventbrite.button}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;