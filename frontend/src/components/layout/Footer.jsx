import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Início', path: '/' },
    { name: 'Presentes', path: '/presentes' },
    { name: 'Álbum', path: '/album' },
    { name: 'Nossa História', path: '/historia' }
  ];

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'Facebook', url: 'https://facebook.com' }
  ];

  return (
    <footer className="bg-primary text-text-light relative z-10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Alana & Matheus
            </h3>
            <p className="text-sm text-secondary-light">
              Celebrando nosso amor em 04 de Junho, 2026
            </p>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-light hover:text-accent transition-colors text-sm"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-primary-light">
          <div className="flex flex-col items-center text-center text-sm text-secondary-light space-y-2">
            <p>
              © {currentYear} Alana & Matheus. Todos os direitos reservados.
            </p>
            <p>
              Desenvolvido por Matheus Macedo e Alana Alves
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
