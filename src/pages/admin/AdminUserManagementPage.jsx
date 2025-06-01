import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, PlusCircle, Search, UserCheck, UserX } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const initialUsers = [
  { id: 'user123', name: 'Test User', email: 'test@example.com', role: 'customer', status: 'Active', joinedDate: '2024-01-15', phone: '081234567890', address: 'Jl. Contoh No.1, Kota Contoh' },
  { id: 'admin001', name: 'Admin Utama', email: 'admin@example.com', role: 'admin', status: 'Active', joinedDate: '2024-01-01', phone: '081111111111', address: 'Kantor Pusat, Kota Admin' },
  { id: 'collab002', name: 'Kolaborator Kue', email: 'kolaborator@example.com', role: 'collaborator', status: 'Pending', joinedDate: '2024-05-01', phone: '082222222222', address: 'Jl. Kue Enak No. 10' },
  { id: 'customerNew', name: 'Pelanggan Baru', email: 'baru@example.com', role: 'customer', status: 'Active', joinedDate: '2024-05-20', phone: '083333333333', address: 'Jl. Harapan Jaya No. 5' },
];

const UserManagementPage = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('dapurAzkaUsers');
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('dapurAzkaUsers', JSON.stringify(users));
  }, [users]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRoleChange = (value) => {
     setCurrentUser(prev => ({ ...prev, role: value }));
  };
  
  const handleStatusChange = (value) => {
     setCurrentUser(prev => ({ ...prev, status: value }));
  };

  const openForm = (user = null) => {
    setIsEditing(!!user);
    setCurrentUser(user ? { ...user } : { id: '', name: '', email: '', role: 'customer', status: 'Active', phone: '', address: '', joinedDate: new Date().toISOString().split('T')[0] });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentUser(null);
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser.name || !currentUser.email || !currentUser.role) {
        toast({ title: "Error", description: "Nama, Email, dan Peran harus diisi.", variant: "destructive" });
        return;
    }

    if (isEditing) {
      setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? currentUser : u));
      toast({ title: "Sukses", description: "Data pengguna berhasil diperbarui." });
    } else {
      const newUser = { ...currentUser, id: `user-${Date.now()}`};
      setUsers(prevUsers => [newUser, ...prevUsers]);
      toast({ title: "Sukses", description: "Pengguna baru berhasil ditambahkan." });
    }
    closeForm();
  };

  const openDeleteDialog = (user) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };
  
  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = () => {
    if (currentUser) {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== currentUser.id));
      toast({ title: "Sukses", description: `Pengguna ${currentUser.name} berhasil dihapus.` });
      closeDeleteDialog();
    }
  };

  const handleVerifyCollaborator = (userId) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === userId && u.role === 'collaborator' ? { ...u, status: 'Active' } : u));
    toast({title: "Sukses", description: "Kolaborator berhasil diverifikasi."});
  };
  
  const handleRejectCollaborator = (userId) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === userId && u.role === 'collaborator' ? { ...u, status: 'Rejected' } : u));
    toast({title: "Info", description: "Permintaan kolaborator ditolak.", variant: "destructive"});
  };


  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-[#4A2C1A] mb-4 sm:mb-0">Manajemen Pengguna</h1>
        <Button onClick={() => openForm()} className="bg-orange-500 hover:bg-orange-600">
          <PlusCircle size={20} className="mr-2" /> Tambah Pengguna
        </Button>
      </div>

      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <div className="relative">
          <Input
            type="text"
            placeholder="Cari pengguna (nama, email, peran)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Peran</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bergabung</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        user.role === 'admin' ? 'bg-red-100 text-red-700' :
                        user.role === 'collaborator' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                    }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                </TableCell>
                <TableCell>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        user.status === 'Active' ? 'bg-green-100 text-green-700' :
                        user.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                        {user.status}
                    </span>
                </TableCell>
                <TableCell>{new Date(user.joinedDate).toLocaleDateString('id-ID')}</TableCell>
                <TableCell className="text-right">
                  {user.role === 'collaborator' && user.status === 'Pending' && (
                    <>
                    <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700" onClick={() => handleVerifyCollaborator(user.id)}>
                        <UserCheck size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => handleRejectCollaborator(user.id)}>
                        <UserX size={18} />
                    </Button>
                    </>
                  )}
                  <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700" onClick={() => openForm(user)}>
                    <Edit size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => openDeleteDialog(user)}>
                    <Trash2 size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredUsers.length === 0 && <p className="text-center py-8 text-gray-500">Tidak ada pengguna yang ditemukan.</p>}
      </div>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={closeForm}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Perbarui informasi pengguna di bawah ini.' : 'Isi detail untuk pengguna baru.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right col-span-1">Nama</Label>
              <Input id="name" name="name" value={currentUser?.name || ''} onChange={handleInputChange} className="col-span-3" placeholder="Nama lengkap pengguna" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right col-span-1">Email</Label>
              <Input id="email" name="email" type="email" value={currentUser?.email || ''} onChange={handleInputChange} className="col-span-3" placeholder="email@example.com"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right col-span-1">Telepon</Label>
              <Input id="phone" name="phone" type="tel" value={currentUser?.phone || ''} onChange={handleInputChange} className="col-span-3" placeholder="Nomor telepon"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right col-span-1">Alamat</Label>
              <Input id="address" name="address" value={currentUser?.address || ''} onChange={handleInputChange} className="col-span-3" placeholder="Alamat lengkap"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right col-span-1">Peran</Label>
              <Select value={currentUser?.role || 'customer'} onValueChange={handleRoleChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih peran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Pelanggan (Customer)</SelectItem>
                  <SelectItem value="collaborator">Kolaborator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right col-span-1">Status</Label>
              <Select value={currentUser?.status || 'Active'} onValueChange={handleStatusChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Aktif</SelectItem>
                  <SelectItem value="Pending">Menunggu Persetujuan</SelectItem>
                  <SelectItem value="Suspended">Ditangguhkan</SelectItem>
                  <SelectItem value="Rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeForm}>Batal</Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">{isEditing ? 'Simpan Perubahan' : 'Tambah Pengguna'}</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Konfirmasi Hapus Pengguna</DialogTitle>
                <DialogDescription>
                    Apakah Anda yakin ingin menghapus pengguna <span className="font-semibold">{currentUser?.name}</span>? Tindakan ini tidak dapat diurungkan.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter className="justify-end space-x-2">
                <Button variant="outline" onClick={closeDeleteDialog}>Batal</Button>
                <Button variant="destructive" onClick={handleDeleteUser}>Ya, Hapus</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </AdminLayout>
  );
};

export default UserManagementPage;