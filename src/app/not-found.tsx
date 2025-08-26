import { Button } from '@/components/atoms/Button';
import Container from '@/components/Container';
import Typography from '@/components/Typography';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container className="min-h-screen flex items-center justify-center py-16">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* 404 Icon/Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Message */}
        <Typography variant="h2" className="text-white mb-4">
          Ops, página não encontrada!
        </Typography>
        <Typography variant="body" className="text-white mb-8">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </Typography>

        {/* Helpful Actions */}
        <div className="space-y-4 my-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              type="link"
              href="/"
            >
              Voltar ao início
            </Button>
            <Button
              variant="primary-outlined"
              type="link"
              href="/vitrines"
            >
              Todas as vitrines
            </Button>
          </div>
        </div>

        {/* Additional Navigation */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-sm text-white mb-4">
            Ou navegue para:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/categorias"
              className="text-primary-600 hover:text-primary-800 transition-colors"
            >
              Categorias
            </Link>
            <Link
              href="/vitrines/50-mais"
              className="text-primary-600 hover:text-primary-800 transition-colors"
            >
              Vitrines 50+
            </Link>
            <Link
              href="/contato"
              className="text-primary-600 hover:text-primary-800 transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
