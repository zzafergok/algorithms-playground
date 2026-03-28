# Project Analysis: Algorithms Playground

Bu rapor, Algorithms Playground projesinin teknik mimarisini, iş modelini ve uygulama detaylarını analiz eder.

## 1. Teknik İskelet (Technical Skeleton)

Algorithms Playground, bilgisayar bilimleri kavramlarını görsel bir deneyime dönüştüren bir eğitim platformudur:

- **Frontend Core**: Next.js (App Router) ve React ile dinamik bir sayfa yapısı kurulmuştur.
- **Dil**: Algoritmaların doğruluğu ve veri yapıları için TypeScript'in katı tip denetimi kullanılmıştır.
- **Styling**: Tailwind CSS ile modern ve temiz bir arayüz, Radix UI ile erişilebilir bileşenler.
- **Görselleştirme Mantığı**: Algoritmalar, React state'leri ve muhtemelen CSS transition/animation'ları kullanılarak adım adım görselleştirilmiştir.
- **Modüler Yapı**: Her algoritma grubu (Sorting, Searching, Graph vb.) kendi klasöründe ve rotasında izole edilmiştir.

## 2. İş İskeleti (Business Skeleton)

Bu proje, bir **Interactive Learning & Visualization Tool** (Etkileşimli Öğrenme ve Görselleştirme Aracı) olarak konumlanır:

- **Değer Önermesi**: Soyut algoritmik kavramları (Örn: Dynamic Programming, Graph Traversal) somut görsel animasyonlara dönüştürerek öğrenme sürecini hızlandırır.
- **Hedef Kitle**: Bilgisayar mühendisliği öğrencileri, mülakatlara hazırlanan yazılımcılar ve algoritma meraklıları.
- **İçerik Genişliği**: Temel sıralama algoritmalarından, gelişmiş kümeleme (Clustering) ve optimizasyon algoritmalarına kadar geniş bir kütüphane sunar.

## 3. Uygulama Detayları (Implementation Details)

- **Kategori Hiyerarşisi**: `src/app/algorithms/` altında çok sayıda kategori tanımlanmıştır:
    - **Sorting & Searching**: Temel taşlar.
    - **Graph Algorithms**: Dijkstra, BFS, DFS gibi karmaşık yapılar.
    - **Advanced Topics**: Backtracking, Dynamic Programming, Clustering.
- **Görselleştirme Kontrolleri**: Hız ayarı, veri seti boyutu, algoritma seçimi ve simülasyonu başlatma/durdurma gibi kontrol mekanizmaları mevcuttur.
- **Eğitsel Kaynaklar**: `/resources` rotası, görselleştirmeleri destekleyen teorik bilgileri ve referansları içerir.

## 4. İnisiyatif & Eksik Parça Analizi (Initiative & Missed Parts)

- **Execution Trace**: Algoritma çalışırken hangi kod satırının o an icra edildiğini gösteren bir "Code Highlight" paneli eklenmesi inisiyatifimdir.
- **Zaman ve Alan Karmaşıklığı Analizi**: Her görselleştirmenin yanında o algoritmanın Big O (Time & Space) değerlerinin canlı olarak gösterilmesi eğitsel değeri artıracaktır.
- **Web Workers**: Ağır hesaplama gerektiren (Örn: Large Graph Optimization) algoritmaların UI thread'ini bloke etmemesi için Web Workers kullanımı önerilir.
- **User Playground**: Kullanıcıların kendi veri setlerini (Örn: Kendi graph yapılarını) manuel olarak çizebilecekleri bir "Sand Box" modu eklenebilir.

## 5. Skill Uyumluluk Analizi (Skill Compatibility)

- **Mevcut Durum**: Proje tamamen algoritma ve veri yapıları odaklıdır.
- **Uyumlu Skill'ler**:
    - `algorithm-mastery-skill`: Karmaşık algoritmaların implementasyonu için.
    - `data-viz-expert`: Görselleştirme performansı ve UX için.
- **Öneri**: Mülakat odaklı bir yapı için `coding-interview-coach` skill'i de eklenebilir.
