# ECommerceUI

Bu proje, modern bir e-ticaret web sitesini React kullanarak hayata geçirir. Kullanıcı dostu bir arayüz sunarak, kullanıcıların ürünleri kolayca inceleyebilmesini, sepetlerine ekleyebilmesini ve sipariş verebilmesini sağlar. Proje, Tailwind CSS ile şık ve duyarlı bir tasarım sunar. Kimlik doğrulama ve yetkilendirme işlemleri için JWT (JSON Web Token) kullanılır ve arka uçta [.NET E-Commerce API](https://github.com/mevlutayilmaz/e-commerce-api) ile entegre çalışır.

## Özellikler

- **Ürün Listeleme ve Detayları:** Kullanıcılar tüm ürünleri veya belirli bir kategoriye ait ürünleri listeleyebilir ve ürün detaylarını inceleyebilir.
- **Arama:** Kullanıcılar, aradıkları ürünleri kolayca bulmak için arama işlevini kullanabilir.
- **Sepete Ekleme:** Kullanıcılar, beğendikleri ürünleri sepetlerine ekleyebilir.
- **Sepet Yönetimi:** Kullanıcılar, sepetlerindeki ürünleri görüntüleyebilir, miktarlarını değiştirebilir ve ürünleri sepetlerinden çıkarabilir.
- **Sipariş Oluşturma:** Kullanıcılar, sepetlerindeki ürünleri sipariş edebilir.
- **Kimlik Doğrulama:** Kullanıcılar, siteye kaydolabilir ve giriş yapabilir.
- **Yetkilendirme:** Yetkili kullanıcılar (adminler), ürünleri yönetebilir (ekleme, güncelleme, silme).

## Teknolojiler

- **React:** JavaScript kütüphanesi
- **Tailwind CSS:** CSS framework
- **Axios:** HTTP istekleri için
- **JWT (JSON Web Token):** Kimlik doğrulama ve yetkilendirme
- **.NET E-Ticaret API'si:** Backend API

## Kurulum

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/mevlutayilmaz/e-commerce-ui.git
   ```

2. **`ECommerceUI` klasörüne gidin.**

3. **Gerekli bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

4. **Projeyi çalıştırın:**
   ```bash
   npm run dev
   ```

## Geliştirme Aşaması

Proje şu anda aktif olarak geliştirilmektedir. Planlanan özellikler şunlardır:

- **Sipariş Onaylama:** Admin paneli üzerinden siparişleri onaylama ve yönetme.
- **Ödeme Entegrasyonu:** Ödeme geçitleri ile entegrasyon.
- **Kullanıcı Profili:** Kullanıcıların profillerini görüntüleme ve düzenleme.

## Ekran Görüntüleri

<table style="border-spacing: 0; border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/19c311be-6f5b-4cd8-94ba-4751177aaa57" width="400" />
      <p style="text-align: center;">Ürünler</p>
    </td>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/c35a608c-e50b-441c-b317-d857fbb28607" width="400" />
      <p style="text-align: center;">Ürün Detay</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/0d6cebd0-75c0-4f27-b403-e26a75b297ec" width="400" />
      <p style="text-align: center;">Kategoriler</p>
    </td>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/1ad3320d-84f0-48bd-b919-1a202c2149fc" width="400" />
      <p style="text-align: center;">Sepet</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/98fbe6c4-4512-4956-8a76-9b9f77c1d111" width="400" />
      <p style="text-align: center;">Admin Paneli</p>
    </td>
    <td style="padding: 0; vertical-align: middle; text-align: center;">
      <img src="https://github.com/user-attachments/assets/5a3f0f8a-0f0b-4333-9fa7-77bb03fa4cdb" width="400" />
      <p style="text-align: center;">Ürün Ekleme</p>
    </td>
  </tr>
</table>


