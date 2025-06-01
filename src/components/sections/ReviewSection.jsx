import React from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const reviews = [
	{
		id: 1,
		name: 'Budi Santoso',
		avatar: 'Budi Santoso Avatar',
		rating: 5,
		comment:
			'Maksubah Premiumnya luar biasa! Teksturnya lembut, manisnya pas, dan aromanya khas. Sangat cocok untuk acara spesial.',
		date: '4 hari lalu',
		productName: 'Maksubah Premium',
	},
	{
		id: 2,
		name: 'Siti Rahayu',
		avatar: 'Siti Rahayu Avatar',
		rating: 4,
		comment:
			'Lapis Legit Originalnya benar-benar autentik. Setiap lapisannya terasa dibuat dengan teliti. Kemasannya juga elegan.',
		date: '1 minggu lalu',
		productName: 'Lapis Legit Original Premium',
	},
	{
		id: 3,
		name: 'Ahmad Rizki',
		avatar: 'Ahmad Rizki Avatar',
		rating: 5,
		comment:
			'Pesan Engkak Duren Middle untuk keluarga, semua suka! Rasa duriannya berasa banget tapi gak eneg. Recommended!',
		date: '2 minggu lalu',
		productName: 'Engkak Duren Middle',
	},
];

const ReviewSection = () => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const handleWriteReview = () => {
		if (isAuthenticated) {
			navigate('/reviews#give-review');
		} else {
			navigate('/login?redirect=/reviews%23give-review');
		}
	};

	return (
		<section id="review" className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-[#4A2C1A] mb-4">
						Testimoni Pelanggan
					</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Apa kata mereka tentang Dapur Azka Qanita?
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{reviews.map((review) => (
						<div key={review.id} className="flex flex-col h-full">
							<div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
								<div>
									<div className="flex items-start mb-3">
										<div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex-shrink-0">
											<img
												alt={review.name}
												className="w-full h-full object-cover rounded-full"
												src="https://images.unsplash.com/photo-1694388001616-1176f534d72f"
											/>
										</div>
										<div>
											<h4 className="font-semibold text-[#4A2C1A]">
												{review.name}
											</h4>
											<div className="flex items-center">
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														size={16}
														className={`mr-1 ${
															i < review.rating
																? 'text-yellow-400 fill-yellow-400'
																: 'text-gray-300'
														}`}
													/>
												))}
											</div>
											<p className="text-xs text-gray-500 mt-1">
												{review.date}
											</p>
										</div>
									</div>
									<p className="text-gray-700 text-sm leading-relaxed mb-3">
										{review.comment}
									</p>
								</div>
								<p className="text-xs text-orange-600 font-medium mt-auto">
									Review untuk: {review.productName}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ReviewSection;