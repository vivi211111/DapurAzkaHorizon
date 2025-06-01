import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, ShoppingBag, Settings, Bell, MessageSquare, ChevronLeft, Edit3, Search, Send, LogOut, Trash2, AlertCircle, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const UserProfileSection = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    avatar: user?.avatar || null,
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      postalCode: user?.postalCode || '',
      avatar: user?.avatar || null,
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    updateUser(profileData);
    toast({ title: "Profil Diperbarui", description: "Informasi profil Anda telah berhasil disimpan." });
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#4A2C1A] mb-3 sm:mb-0">Profil Saya</h2>
        {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 w-full sm:w-auto">
                <Edit3 size={16} className="mr-2" /> Edit Profil
            </Button>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 rounded-full mb-4 group">
                <img  
                    alt="Avatar Pengguna" 
                    className="w-full h-full object-cover rounded-full shadow-md"
                    src={profileData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || 'U')}&background=FF8A00&color=fff&size=128`} 
                />
                {isEditing && (
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="absolute bottom-0 right-0 bg-white/80 hover:bg-white rounded-full p-2"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Camera size={18} className="text-gray-600"/>
                    </Button>
                )}
            </div>
            {isEditing && <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" />}
            {!isEditing && <p className="text-xl font-semibold text-gray-800">{profileData.name || 'Nama Pengguna'}</p>}
            {!isEditing && <p className="text-sm text-gray-500">{profileData.email || 'Email Pengguna'}</p>}
        </div>

        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><Label htmlFor="name">Nama Lengkap</Label><Input id="name" name="name" value={profileData.name} onChange={handleInputChange} /></div>
            <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" value={profileData.email} onChange={handleInputChange} disabled /></div>
            <div><Label htmlFor="phone">Nomor Telepon</Label><Input id="phone" name="phone" type="tel" value={profileData.phone} onChange={handleInputChange} /></div>
            <div className="md:col-span-2"><Label htmlFor="address">Alamat</Label><Input id="address" name="address" value={profileData.address} onChange={handleInputChange} /></div>
            <div><Label htmlFor="city">Kota/Kabupaten</Label><Input id="city" name="city" value={profileData.city} onChange={handleInputChange} /></div>
            <div><Label htmlFor="postalCode">Kode Pos</Label><Input id="postalCode" name="postalCode" value={profileData.postalCode} onChange={handleInputChange} /></div>
            <div className="md:col-span-2 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)} className="w-full sm:w-auto">Batal</Button>
                <Button onClick={handleSaveProfile} className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white">Simpan Profil</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div><span className="font-medium text-gray-600">Nomor Telepon:</span> <span className="text-gray-800">{user?.phone || '-'}</span></div>
            <div className="md:col-span-2"><span className="font-medium text-gray-600">Alamat:</span> <span className="text-gray-800">{user?.address ? `${user.address}, ${user.city || ''} ${user.postalCode || ''}` : '-'}</span></div>
          </div>
        )}
      </div>
    </div>
  );
};

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    setOrders(storedOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
  }, []);
  
  const handleScrollToMenu = () => {
    navigate('/', { state: { scrollToSection: 'menu' } });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#4A2C1A] mb-6">Pesanan Saya</h2>
      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">Anda belum memiliki riwayat pesanan.</p>
          <Button onClick={handleScrollToMenu} className="bg-orange-500 hover:bg-orange-600 text-white">
            Mulai Belanja Sekarang
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.orderId || new Date(order.orderDate).getTime()} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">Pesanan #{ (order.orderId || new Date(order.orderDate).getTime()).toString().slice(-6)}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {order.status || 'Diproses'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">Tanggal: {new Date(order.orderDate).toLocaleDateString('id-ID')}</p>
              <p className="text-sm text-gray-500 mb-2">Total: Rp {order.total.toLocaleString('id-ID')}</p>
              <div className="text-xs text-gray-600">
                {order.items.slice(0, 2).map(item => item.name).join(', ')}
                {order.items.length > 2 ? ` dan ${order.items.length - 2} lainnya` : ''}
              </div>
              <Button variant="link" className="p-0 h-auto text-orange-500 text-sm mt-2">Lihat Detail</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SettingsSection = () => {
  const { logout: authLogout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    authLogout();
    toast({ title: "Berhasil Keluar", description: "Anda telah berhasil keluar." });
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    deleteAccount();
    toast({ title: "Akun Dihapus", description: "Akun Anda telah berhasil dihapus.", variant: "destructive" });
    navigate('/login');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#4A2C1A] mb-6">Pengaturan Akun</h2>
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Keamanan Akun</h3>
            <Button onClick={() => navigate('/change-password')} variant="outline" className="w-full md:w-auto justify-start">Ubah Password</Button>
            <p className="text-xs text-gray-500 mt-1">Ubah password akun Anda secara berkala.</p>
        </div>
        <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Manajemen Akun</h3>
            <div className="space-y-3">
                <Button onClick={handleLogout} variant="outline" className="w-full md:w-auto justify-start text-orange-600 border-orange-500 hover:bg-orange-50">
                    <LogOut size={16} className="mr-2" /> Keluar
                </Button>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full md:w-auto justify-start">
                            <Trash2 size={16} className="mr-2" /> Hapus Akun
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <div className="flex justify-center mb-3">
                            <AlertCircle className="w-12 h-12 text-red-500" />
                        </div>
                        <AlertDialogTitle className="text-center text-xl font-semibold">Anda Yakin Ingin Menghapus Akun?</AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-sm text-gray-600">
                            Tindakan ini tidak dapat diurungkan. Semua data Anda, termasuk riwayat pesanan dan informasi profil, akan dihapus secara permanen.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
                        <AlertDialogCancel className="w-full sm:w-auto">Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
                            Ya, Hapus Akun Saya
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                 <p className="text-xs text-gray-500 mt-1">Keluar dari sesi saat ini atau hapus akun Anda secara permanen.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsSection = () => (
  <div>
    <h2 className="text-2xl font-bold text-[#4A2C1A] mb-6">Notifikasi</h2>
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center text-gray-500">
        <Bell size={24} className="mr-3 text-yellow-500"/>
        <p>Tidak ada notifikasi baru untuk saat ini.</p>
      </div>
    </div>
  </div>
);

const CHAT_STORAGE_KEY = 'dapurAzkaAllUserChats';

const MessagesSection = () => {
    const { user } = useAuth();
    const [allChats, setAllChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const { toast } = useToast();
    const chatLogRef = useRef(null);

    useEffect(() => {
        const storedChats = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]');
        setAllChats(storedChats);

        if (user?.role !== 'admin') {
            let userChatWithAdmin = storedChats.find(chat => chat.userId === user?.id && chat.otherPartyId === 'admin001');
            if (!userChatWithAdmin) {
                userChatWithAdmin = { 
                    id: `chat-${user?.id}-admin001`, 
                    userId: user?.id, 
                    userName: user?.name,
                    userAvatar: user?.avatar,
                    otherPartyId: 'admin001',
                    otherParty: 'Admin Dapur Azka', 
                    otherPartyAvatar: 'https://ui-avatars.com/api/?name=Admin&background=4A2C1A&color=fff', 
                    lastMessage: "Mulai percakapan dengan Admin!", 
                    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
                    unreadCount: { customer: 0, admin: 0 },
                    chatLog: [{senderId: 'system', text: "Percakapan dimulai.", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]
                };
                const updatedChats = [...storedChats, userChatWithAdmin];
                setAllChats(updatedChats);
                localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedChats));
            }
            setSelectedChat(userChatWithAdmin);
        }
    }, [user]);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === CHAT_STORAGE_KEY) {
                const updatedChats = JSON.parse(event.newValue || '[]');
                setAllChats(updatedChats);
                if (selectedChat) {
                    const updatedSelectedChat = updatedChats.find(c => c.id === selectedChat.id);
                    if (updatedSelectedChat) {
                        setSelectedChat(prev => ({...prev, ...updatedSelectedChat, unreadCount: {...prev.unreadCount, [user?.role === 'admin' ? 'admin' : 'customer']: 0 }}));
                    }
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [selectedChat, user?.role]);
    
    useEffect(() => {
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [selectedChat?.chatLog]);


    const handleSelectChat = (chatId) => {
        const chat = allChats.find(m => m.id === chatId);
        if (chat) {
            const newUnreadCount = { ...chat.unreadCount, [user?.role === 'admin' ? 'admin' : 'customer']: 0 };
            const updatedChat = {...chat, unreadCount: newUnreadCount };
            setSelectedChat(updatedChat);

            const updatedAllChats = allChats.map(c => c.id === chatId ? updatedChat : c);
            setAllChats(updatedAllChats);
            localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedAllChats));
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedChat) return;
        
        const newMsgObject = {
            senderId: user?.id, 
            text: newMessage, 
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };

        const updatedChatLog = [...selectedChat.chatLog, newMsgObject];
        const newUnreadKey = user?.role === 'admin' ? 'customer' : 'admin';
        const updatedUnreadCount = {
            ...selectedChat.unreadCount,
            [newUnreadKey]: (selectedChat.unreadCount[newUnreadKey] || 0) + 1
        };

        const updatedSelectedChat = {
            ...selectedChat, 
            chatLog: updatedChatLog, 
            lastMessage: newMessage, 
            time: newMsgObject.time,
            unreadCount: updatedUnreadCount
        };
        
        setSelectedChat(updatedSelectedChat);

        const updatedAllChats = allChats.map(chat => 
            chat.id === selectedChat.id 
            ? updatedSelectedChat
            : chat
        );
        setAllChats(updatedAllChats);
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedAllChats));
        setNewMessage("");
        toast({ title: "Pesan Terkirim"});

        if (user?.role !== 'admin' && selectedChat.otherPartyId === 'admin001') {
            setTimeout(() => {
                const autoReply = {
                    senderId: 'admin001', 
                    text: "Terima kasih atas pesan Anda. Admin kami akan segera merespons.",
                    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                };
                const chatAfterReply = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]').find(c => c.id === selectedChat.id);
                if (chatAfterReply) {
                    const replyUpdatedChatLog = [...chatAfterReply.chatLog, autoReply];
                    const replyUnreadCount = { ...chatAfterReply.unreadCount, customer: (chatAfterReply.unreadCount.customer || 0) + 1 };

                    const replyUpdatedSelectedChat = {
                        ...chatAfterReply,
                        chatLog: replyUpdatedChatLog,
                        lastMessage: autoReply.text,
                        time: autoReply.time,
                        unreadCount: replyUnreadCount
                    };
                    
                    const finalChats = allChats.map(c => c.id === selectedChat.id ? replyUpdatedSelectedChat : c);
                    setAllChats(finalChats);
                    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(finalChats));
                    // Update selected chat state if it's still the current one
                    setSelectedChat(prev => prev.id === selectedChat.id ? replyUpdatedSelectedChat : prev);
                }
            }, 1500);
        }
    };
    
    const displayChats = user?.role === 'admin' ? allChats : allChats.filter(c => c.userId === user?.id);

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-230px)] md:h-[calc(100vh-200px)] border border-gray-200 rounded-lg overflow-hidden">
            {user?.role === 'admin' && (
                <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <input type="text" placeholder="Cari percakapan..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"/>
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-grow">
                        {displayChats.sort((a,b) => (b.unreadCount?.admin || 0) - (a.unreadCount?.admin || 0) || new Date(b.time) - new Date(a.time) ).map(msg => (
                            <div 
                                key={msg.id} 
                                className={`p-4 border-b border-gray-200 hover:bg-yellow-50 cursor-pointer ${selectedChat?.id === msg.id ? 'bg-yellow-100' : ''}`}
                                onClick={() => handleSelectChat(msg.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex-shrink-0">
                                            <img  alt={`${msg.userName} avatar`} className="w-full h-full object-cover rounded-full" src={msg.userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.userName || 'C')}&background=random`} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-800 truncate">{msg.userName}</p>
                                            <p className="text-sm text-gray-500 truncate">{msg.lastMessage}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0 ml-2">
                                        <p className="text-xs text-gray-400 mb-1">{msg.time}</p>
                                        {(msg.unreadCount?.admin || 0) > 0 && (
                                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{msg.unreadCount.admin}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className={`w-full ${user?.role === 'admin' ? 'md:w-2/3' : 'md:w-full'} flex flex-col bg-white`}>
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b border-gray-200 flex items-center">
                             <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex-shrink-0">
                                <img  alt={`${selectedChat.otherParty} avatar`} className="w-full h-full object-cover rounded-full" src={selectedChat.otherPartyAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedChat.otherParty || 'A')}&background=random`} />
                            </div>
                            <h3 className="text-lg font-semibold text-[#4A2C1A]">{selectedChat.otherParty}</h3>
                        </div>
                        <div ref={chatLogRef} className="flex-grow p-4 overflow-y-auto space-y-3 bg-gray-50">
                            {selectedChat.chatLog.map((message, index) => (
                                <div key={index} className={`flex ${ message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg shadow ${ message.senderId === user?.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-800'}`}>
                                        <p className="text-sm">{message.text}</p>
                                        <p className={`text-xs mt-1 ${ message.senderId === user?.id ? 'text-orange-100' : 'text-gray-500'}`}>{message.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center bg-white">
                            <input 
                                type="text" 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Ketik pesan Anda..." 
                                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-l-none px-4 py-2">
                                <Send size={20} />
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-400 p-4">
                        <MessageSquare size={64} className="mb-4" />
                        <p className="text-lg">{user?.role === 'admin' ? 'Pilih percakapan untuk mulai chat.' : 'Chat dengan Admin Dapur Azka'}</p>
                        <p className="text-sm">Riwayat pesan Anda akan muncul di sini.</p>
                    </div>
                )}
            </div>
        </div>
    );
};


const DashboardPage = () => {
  const { section = 'profile' } = useParams(); 
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState(section);

  useEffect(() => {
    setActiveSection(section);
  }, [section]);

  const sidebarNavItems = [
    { name: 'Profil Saya', icon: User, section: 'profile' },
    { name: 'Pesanan Saya', icon: ShoppingBag, section: 'orders' },
    { name: 'Pesan', icon: MessageSquare, section: 'messages' },
    { name: 'Notifikasi', icon: Bell, section: 'notifications' },
    { name: 'Pengaturan', icon: Settings, section: 'settings' },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return <UserProfileSection />;
      case 'orders': return <OrdersSection />;
      case 'settings': return <SettingsSection />;
      case 'notifications': return <NotificationsSection />;
      case 'messages': return <MessagesSection />;
      default: return <UserProfileSection />;
    }
  };

  const handleNavClick = (sectionName) => {
    setActiveSection(sectionName);
    navigate(`/dashboard/${sectionName}`);
  };

  return (
    <Layout simpleNavbar={true}>
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate('/')} className="mb-6 text-orange-500 border-orange-500 hover:bg-orange-50">
          <ChevronLeft size={16} className="mr-2" /> Kembali ke Beranda
        </Button>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 flex-shrink-0 overflow-hidden">
                <img  
                    alt="Avatar Pengguna" 
                    className="w-full h-full object-cover"
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=FF8A00&color=fff&size=48`} 
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user?.name || 'Pengguna'}</p>
                <p className="text-sm text-gray-500 truncate max-w-[150px]">{user?.email || 'Tidak ada email'}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {sidebarNavItems.map(item => (
                <Button
                  key={item.section}
                  variant={activeSection === item.section ? 'default' : 'ghost'}
                  onClick={() => handleNavClick(item.section)}
                  className={`w-full justify-start text-base py-3 px-4 ${
                    activeSection === item.section 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'text-gray-700 hover:bg-yellow-50 hover:text-orange-600'
                  }`}
                >
                  <item.icon size={20} className="mr-3 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Button>
              ))}
            </nav>
          </aside>
          <main className="md:w-3/4">
            {renderSection()}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;