# Algorithms Playground - Algoritma Görselleştirme Platformu

Algorithms Playground, algoritmaları interaktif bir şekilde öğrenmenizi sağlayan kapsamlı bir eğitim platformudur. Bu uygulama, algoritmaların çalışma prensiplerini görsel olarak anlama, adım adım takip etme ve kendi verilerinizle test etme imkanı sunar.

![Algorithms Playground Screenshot](https://via.placeholder.com/800x400)

## Özellikler

- **İnteraktif Görselleştirmeler**: Algoritmaların çalışma mantığını adım adım görselleştirme
- **Kapsamlı Algoritma Kütüphanesi**: Sıralama, arama, graf, dinamik programlama ve daha fazlası
- **Kod Örnekleri**: Her algoritma için farklı programlama dillerinde (JavaScript, Python, Java) örnekler
- **Canlı Demo**: Kendi verilerinizle algoritmaları test etme imkanı
- **Detaylı Açıklamalar**: Her algoritmanın zaman/alan karmaşıklığı, avantajları ve dezavantajları
- **Karanlık/Açık Tema**: Kullanıcı tercihine göre arayüz renk teması

## Proje Kategorileri

- 🔄 **Sıralama Algoritmaları**: Bubble Sort, Quick Sort, Merge Sort vb.
- 🔍 **Arama Algoritmaları**: Binary Search, Linear Search vb.
- 📊 **Graf Algoritmaları**: BFS, DFS, Dijkstra, Bellman-Ford vb.
- 📋 **Veri Yapıları**: Linked List, Stack, Queue, Binary Search Tree, Hash Table vb.
- 🧮 **Dinamik Programlama**: Fibonacci, Knapsack, Longest Common Subsequence vb.
- ↩️ **Geri İzleme**: N-Queens, Subset Sum vb.
- 🌐 **Kümeleme Algoritmaları**: K-Means, Hierarchical Clustering vb.
- ⚙️ **Optimizasyon Algoritmaları**: Simulated Annealing, Genetic Algorithms vb.
- 📝 **Metin İşleme Algoritmaları**: Rabin-Karp, KMP vb.

## Teknoloji Yığını

- [Next.js](https://nextjs.org/) - React framework (App Router)
- [TypeScript](https://www.typescriptlang.org/) - Tip güvenliği
- [Tailwind CSS](https://tailwindcss.com/) - Stil ve arayüz
- [shadcn/ui](https://ui.shadcn.com/) - UI bileşenleri
- [Lucide React](https://lucide.dev/) - İkonlar
- [next-themes](https://github.com/pacocoursey/next-themes) - Tema desteği

## Kurulum

Projeyi yerel makinenizde çalıştırmak için şu adımları izleyin:

```bash
# Projeyi klonlayın
git clone https://github.com/zzafergok/algorithms-playground.git
cd algorithms-playground

# Bağımlılıkları yükleyin
npm install
# veya
yarn install
# veya
pnpm install
# veya
bun install

# Geliştirme sunucusunu başlatın
npm run dev
# veya
yarn dev
# veya
pnpm dev
# veya
bun dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyebilirsiniz.

## Proje Yapısı

```
algorithms-playground/
├── public/          # Statik dosyalar
├── src/
│   ├── app/         # Sayfa bileşenleri (Next.js App Router)
│   │   ├── algorithms/  # Algoritma sayfaları
│   │   ├── page.tsx     # Ana sayfa
│   ├── components/  # UI bileşenleri
│   │   ├── common/      # Ortak bileşenler
│   │   ├── layout/      # Düzen bileşenleri
│   │   ├── theme/       # Tema bileşenleri
│   │   ├── ui/          # Temel UI bileşenleri (shadcn)
│   ├── context/     # React context tanımlamaları
│   ├── lib/         # Yardımcı fonksiyonlar ve algoritma uygulamaları
│   │   ├── algorithms/  # Algoritma implementasyonları
│   ├── styles/      # Global stil tanımlamaları
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
```

## Katkıda Bulunma

Bu proje geliştirilmeye açıktır. Katkıda bulunmak için:

1. Bir fork oluşturun
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request oluşturun

## Özellik İstekleri ve Hata Bildirimleri

Yeni özellik önerileri veya hata bildirimleri için lütfen bir issue açın.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## İletişim

Proje sahibi: [gok.zaferr@gmail.com](mailto:gok.zaferr@gmail.com)

---

Algorithms Playground, algoritmaları öğrenmek ve anlamak için etkili bir araçtır. İyi öğrenmeler!
