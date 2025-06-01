import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ThumbsUp, MessageSquare, ChevronLeft, Search, ImagePlus, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const initialProductsData = [
  // Middle Category
  { id: 'maksubah-middle', name: 'Maksubah Middle' },
  { id: 'maksubah-prunes-middle', name: 'Maksubah Prunes Middle' },
  { id: 'maksubah-keju-middle', name: 'Maksubah Keju Middle' },
  { id: 'maksubah-coklat-middle', name: 'Maksubah Coklat Middle' },
  { id: 'lapan-jam-middle', name: 'Lapan Jam Middle' },
  { id: 'lapan-jam-duren-middle', name: 'Lapan Jam Duren Middle' },
  { id: 'lapan-jam-keju-middle', name: 'Lapan Jam Keju Middle' },
  { id: 'lapis-kojo-middle', name: 'Lapis Kojo Middle' },
  { id: 'lapis-kojo-duren-middle', name: 'Lapis Kojo Duren Middle' },
  { id: 'engkak-middle', name: 'Engkak Middle' },
  { id: 'engkak-duren-middle', name: 'Engkak Duren Middle' },
  { id: 'maksubah-kojo-makjo-middle', name: 'Maksubah Kojo (Makjo) Middle' },
  { id: 'maksubah-kojo-makjo-prunes-middle', name: 'Maksubah Kojo (Makjo) Prunes Middle' },
  { id: 'maksubah-engkak-kojo-makengko-middle', name: 'Maksubah Engkak Kojo (MakEngKo) Middle' },
  // Premium Category
  { id: 'maksubah-premium', name: 'Maksubah Premium' },
  { id: 'maksubah-prunes-premium', name: 'Maksubah Prunes Premium' },
  { id: 'maksubah-keju-premium', name: 'Maksubah Keju Premium' },
  { id: 'maksubah-coklat-premium', name: 'Maksubah Coklat Premium' },
  { id: 'lapan-jam-premium', name: 'Lapan Jam Premium' },
  { id: 'lapan-jam-duren-premium', name: 'Lapan Jam Duren Premium' },
  { id: 'lapan-jam-keju-premium', name: 'Lapan Jam Keju Premium' },
  { id: 'lapis-kojo-premium', name: 'Lapis Kojo Premium' },
  { id: 'lapis-kojo-duren-premium', name: 'Lapis Kojo Duren Premium' },
  { id: 'engkak-premium', name: 'Engkak Premium' },
  { id: 'engkak-duren-premium', name: 'Engkak Duren Premium' },
  { id: 'maksubah-kojo-makjo-premium', name: 'Maksubah Kojo (Makjo) Premium' },
  { id: 'maksubah-kojo-makjo-prunes-premium', name: 'Maksubah Kojo (Makjo) Prunes Premium' },
  { id: 'maksubah-engkak-kojo-makengko-premium', name: 'Maksubah Engkak Kojo (MakEngKo) Premium' },
  { id: 'lapis-legit-original-premium', name: 'Lapis Legit Original Premium' },
  { id: 'lapis-legit-nanas-premium', name: 'Lapis Legit Nanas Premium' },
  { id: 'lapis-legit-keju-premium', name: 'Lapis Legit Keju Premium' },
  { id: 'lapis-legit-coklat-premium', name: 'Lapis Legit Coklat Premium' },
  { id: 'lapis-legit-prunes-premium', name: 'Lapis Legit Prunes Premium' },
];

const initialReviewsData = [
  { id: 1, userId: 'user123', userName: 'Budi Santoso', userAvatar: 'Budi Santoso Avatar', userProfile: 'Pecinta Kue Tradisional', productName: 'Maksubah Premium', productId: 'maksubah-premium', rating: 5, comment: 'Maksubah Premiumnya benar-benar istimewa! Teksturnya lembut, manisnya pas, dan aroma khasnya sangat menggugah selera. Cocok untuk acara penting atau hadiah.', date: '2025-05-20T10:00:00Z', photos: [], helpfulVotes: 12 },
  { id: 2, userId: 'user456', userName: 'Siti Rahayu', userAvatar: 'Siti Rahayu Avatar', userProfile: 'Karyawan Swasta', productName: 'Lapis Legit Original Premium', productId: 'lapis-legit-original-premium', rating: 4, comment: 'Lapis Legitnya enak, wangi rempahnya terasa. Setiap lapisannya rapi dan matang sempurna. Kemasannya juga premium, cocok untuk hantaran.', date: '2025-05-18T14:30:00Z', photos: ['Contoh Foto Kue Lapis Legit'], helpfulVotes: 8 },
  { id: 3, userId: 'user789', userName: 'Ahmad Rizki', userAvatar: 'Ahmad Rizki Avatar', userProfile: 'Pengusaha Kuliner', productName: 'Engkak Duren Middle', productId: 'engkak-duren-middle', rating: 5, comment: 'Sebagai sesama penjual kue, saya akui Engkak Duren di sini juara! Rasa duriannya asli, tekstur engkaknya pas. Harganya juga sebanding dengan kualitas.', date: '2025-05-15T09:15:00Z', photos: ['Contoh Foto Engkak Duren'], helpfulVotes: 15 },
  { id: 4, userId: 'user101', userName: 'Dewi Lestari', userAvatar: 'Dewi Lestari Avatar', userProfile: 'Ibu Rumah Tangga', productName: 'Lapan Jam Keju Middle', productId: 'lapan-jam-keju-middle', rating: 4, comment: 'Anak-anak suka Lapan Jam Keju ini. Manisnya pas, ada gurih kejunya. Jadi pilihan favorit buat camilan keluarga.', date: '2025-05-22T18:00:00Z', photos: [], helpfulVotes: 5 },
  { id: 5, userId: 'user112', userName: 'Rian Ardianto', userAvatar: 'Rian Ardianto Avatar', userProfile: 'Mahasiswa', productName: 'Maksubah Kojo (Makjo) Middle', productId: 'maksubah-kojo-makjo-middle', rating: 5, comment: 'Makjo-nya unik! Perpaduan Maksubah dan Kojo ternyata enak banget. Harganya juga masih terjangkau buat mahasiswa. Mantap!', date: '2025-05-21T16:45:00Z', photos: [], helpfulVotes: 9 },
];


const ReviewsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [allReviews, setAllReviews] = useState(() => {
    const storedReviews = localStorage.getItem('allProductReviews');
    return storedReviews ? JSON.parse(storedReviews) : initialReviewsData;
  });
  const [filteredReviews, setFilteredReviews] = useState(allReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('semua');
  const [sortOrder, setSortOrder] = useState('terbaru');
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ productName: '', productId: '', rating: 0, comment: '', photos: [] });
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (location.hash === '#give-review' && isAuthenticated) {
      setShowReviewForm(true);
      document.getElementById('give-review-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location, isAuthenticated]);
  
  useEffect(() => {
    localStorage.setItem('allProductReviews', JSON.stringify(allReviews));
    
    let tempReviews = [...allReviews];
    if (searchTerm) {
      tempReviews = tempReviews.filter(r => 
        r.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterRating !== 'semua') {
      tempReviews = tempReviews.filter(r => r.rating === parseInt(filterRating));
    }
    if (sortOrder === 'terbaru') {
      tempReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === 'terlama') {
      tempReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOrder === 'rating-tinggi') {
      tempReviews.sort((a, b) => b.rating - a.rating || b.helpfulVotes - a.helpfulVotes);
    } else if (sortOrder === 'rating-rendah') {
      tempReviews.sort((a, b) => a.rating - b.rating || b.helpfulVotes - a.helpfulVotes);
    }
    setFilteredReviews(tempReviews);
  }, [allReviews, searchTerm, filterRating, sortOrder]);

  const averageRating = allReviews.length > 0 ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1) : '0.0';
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  allReviews.forEach(r => ratingCounts[r.rating]++);

  const handleNewReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleProductSelect = (productId) => {
    const selectedProduct = initialProductsData.find(p => p.id === productId);
    setNewReview(prev => ({ ...prev, productId: selectedProduct.id, productName: selectedProduct.name }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const photoPreviews = files.map(file => URL.createObjectURL(file)); 
    setNewReview(prev => ({ ...prev, photos: [...prev.photos, ...photoPreviews.slice(0, 3 - prev.photos.length)] })); 
  };
  
  const removePhoto = (index) => {
    setNewReview(prev => ({...prev, photos: prev.photos.filter((_, i) => i !== index)}));
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({ title: "Login Diperlukan", description: "Anda harus login untuk memberi review.", variant: "destructive" });
      navigate('/login?redirect=/reviews%23give-review');
      return;
    }
    if (newReview.rating === 0 || !newReview.productId || !newReview.comment.trim()) {
      toast({ title: "Form Tidak Lengkap", description: "Mohon pilih produk, berikan rating, dan tulis komentar.", variant: "destructive" });
      return;
    }
    const reviewToAdd = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar || '',
      userProfile: user.profileStatus || 'Pelanggan', 
      productName: newReview.productName,
      productId: newReview.productId,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
      photos: newReview.photos, 
      helpfulVotes: 0,
    };
    setAllReviews(prev => [reviewToAdd, ...prev]);
    setNewReview({ productName: '', productId: '', rating: 0, comment: '', photos: [] });
    setShowReviewForm(false);
    toast({ title: "Review Terkirim!", description: "Terima kasih atas ulasan Anda." });
  };
  
  const handleHelpfulVote = (reviewId) => {
    setAllReviews(prevReviews => prevReviews.map(r => 
        r.id === reviewId ? {...r, helpfulVotes: (r.helpfulVotes || 0) + 1} : r
    ));
    toast({title: "Terima kasih!", description: "Masukan Anda membantu kami."});
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate('/')} className="mb-6 text-orange-500 border-orange-500 hover:bg-orange-50">
          <ChevronLeft size={16} className="mr-2" /> Kembali ke Beranda
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold text-[#4A2C1A] mb-3 text-center">Semua Ulasan Kue Kami</h1>
        <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
          Lihat apa kata pelanggan tentang kelezatan kue lapis tradisional Dapur Azka Qanita.
        </p>

        {/* Overall Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-white p-6 rounded-lg shadow">
          <div className="text-center border-r-0 md:border-r md:border-gray-200 pr-0 md:pr-4">
            <p className="text-5xl font-bold text-orange-600">{averageRating}</p>
            <div className="flex justify-center my-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} className={`mr-0.5 ${i < Math.round(parseFloat(averageRating)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
            </div>
            <p className="text-sm text-gray-500">{allReviews.length} Total Review</p>
          </div>
          <div className="col-span-1 md:col-span-2 pl-0 md:pl-4">
            <p className="font-semibold text-gray-700 mb-2">Distribusi Rating:</p>
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="flex items-center text-sm mb-0.5">
                <span className="w-12 text-gray-600">{star} Bintang</span>
                <div className="flex-grow bg-gray-200 rounded-full h-2.5 mx-2">
                  <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${allReviews.length > 0 ? (ratingCounts[star] / allReviews.length) * 100 : 0}%` }}></div>
                </div>
                <span className="w-8 text-gray-600 text-right">({ratingCounts[star]})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/3">
            <Input type="text" placeholder="Cari review (kue, komentar)..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-full md:w-[150px]"><SelectValue placeholder="Semua Rating" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua Rating</SelectItem>
                {[5,4,3,2,1].map(r => <SelectItem key={r} value={String(r)}>{r} Bintang</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full md:w-[150px]"><SelectValue placeholder="Urutkan" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="terbaru">Terbaru</SelectItem>
                <SelectItem value="terlama">Terlama</SelectItem>
                <SelectItem value="rating-tinggi">Rating Tertinggi</SelectItem>
                <SelectItem value="rating-rendah">Rating Terendah</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => { setShowReviewForm(true); document.getElementById('give-review-form')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full md:w-auto bg-orange-500 hover:bg-orange-600">
            <MessageSquare size={18} className="mr-2"/> Beri Ulasan Kue
          </Button>
        </div>
        
        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map(review => (
            <motion.div 
                key={review.id} 
                className="bg-white p-6 rounded-lg shadow-md flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
              <div className="flex items-start mb-3">
                <img  alt={review.userName} className="w-10 h-10 rounded-full mr-3 object-cover" src={review.userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.userName)}&background=random`} />
                <div>
                  <p className="font-semibold text-gray-800">{review.userName}</p>
                  <p className="text-xs text-gray-500">{review.userProfile} - {new Date(review.date).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className={`mr-0.5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                <span className="ml-2 text-sm font-medium text-gray-700">{review.productName}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3 flex-grow">{review.comment}</p>
              {review.photos && review.photos.length > 0 && (
                <div className="flex space-x-2 mb-3">
                  {review.photos.map((photo, index) => (
                    <img  key={index} alt={`Review photo ${index+1}`} className="w-16 h-16 object-cover rounded-md border" src={photo.startsWith('blob:') ? photo : `https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop`} />
                  ))}
                </div>
              )}
              <Button variant="ghost" size="sm" onClick={() => handleHelpfulVote(review.id)} className="text-xs text-orange-600 hover:text-orange-700 self-start p-1 h-auto">
                <ThumbsUp size={14} className="mr-1" /> Membantu ({review.helpfulVotes || 0})
              </Button>
            </motion.div>
          ))}
        </div>
        {filteredReviews.length === 0 && <p className="text-center text-gray-500 mt-8">Tidak ada review yang cocok dengan filter Anda.</p>}

        {/* Review Form Section */}
        {showReviewForm && (
          <motion.section 
            id="give-review-form" 
            className="mt-16 pt-10 border-t"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-[#4A2C1A] mb-6 text-center">Berikan Ulasan Kue Anda</h2>
            <form onSubmit={submitReview} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reviewerName">Nama Anda</Label>
                  <Input id="reviewerName" value={user?.name || ''} disabled placeholder="Nama Anda (dari profil)" />
                </div>
                <div>
                  <Label htmlFor="reviewerProfile">Profesi/Status</Label>
                  <Input id="reviewerProfile" value={user?.profileStatus || ''} disabled placeholder="Contoh: Mahasiswa (dari profil)" />
                </div>
              </div>
              <div>
                <Label htmlFor="productReviewed">Kue yang Dipesan</Label>
                <Select onValueChange={handleProductSelect} value={newReview.productId}>
                  <SelectTrigger><SelectValue placeholder="Pilih kue yang Anda pesan" /></SelectTrigger>
                  <SelectContent>
                    {initialProductsData.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Rating</Label>
                <div className="flex items-center space-x-1 mt-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={28}
                      className={`cursor-pointer transition-colors ${(hoverRating || newReview.rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="reviewComment">Ulasan Anda</Label>
                <Textarea id="reviewComment" name="comment" value={newReview.comment} onChange={handleNewReviewChange} placeholder="Ceritakan pengalaman Anda menikmati kue dari Dapur Azka Qanita..." rows={4} required />
              </div>
              <div>
                <Label htmlFor="reviewPhotos">Unggah Foto (Opsional, maks. 3)</Label>
                <div className="mt-1 flex items-center space-x-2">
                    <Input id="reviewPhotos" type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    <Button type="button" variant="outline" onClick={() => document.getElementById('reviewPhotos').click()} disabled={newReview.photos.length >= 3}>
                        <ImagePlus size={16} className="mr-2"/> Pilih Foto
                    </Button>
                    <span className="text-xs text-gray-500">{newReview.photos.length}/3 foto terpilih</span>
                </div>
                {newReview.photos.length > 0 && (
                    <div className="mt-2 flex space-x-2">
                        {newReview.photos.map((photoSrc, index) => (
                            <div key={index} className="relative w-20 h-20">
                                <img  alt={`Preview ${index}`} className="w-full h-full object-cover rounded border" src={photoSrc}/>
                                <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={() => removePhoto(index)}>
                                    <X size={12}/>
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>Batal</Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">Kirim Ulasan</Button>
              </div>
            </form>
          </motion.section>
        )}
      </div>
    </Layout>
  );
};

export default ReviewsPage;