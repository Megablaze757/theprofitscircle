// ============================================
// ADMIN DASHBOARD PAGE
// ============================================

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Crown, 
  HandCoins, 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  Check,
  X,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { setAdminSession, getVIPUsers, getAffiliateUsers, addVIPUser, updateVIPUser, deleteVIPUser, addAffiliateUser, updateAffiliateUser, deleteAffiliateUser, type VIPUser, type AffiliateUser } from '@/services/storage';
import { useToast } from '@/hooks/useToast';

type AdminTab = 'dashboard' | 'vip' | 'affiliates';

interface AdminDashboardProps {
  onLogout: () => void;
}

function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [vipUsers, setVIPUsers] = useState<VIPUser[]>([]);
  const [affiliateUsers, setAffiliateUsers] = useState<AffiliateUser[]>([]);
  const [showVIPModal, setShowVIPModal] = useState(false);
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);
  const [editingVIP, setEditingVIP] = useState<VIPUser | null>(null);
  const [editingAffiliate, setEditingAffiliate] = useState<AffiliateUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  // Form states
  const [vipForm, setVIPForm] = useState({
    name: '',
    email: '',
    plan: 'free' as 'free' | 'pro' | 'elite',
    status: 'active' as 'active' | 'inactive',
  });

  const [affiliateForm, setAffiliateForm] = useState({
    name: '',
    email: '',
    tier: 'starter' as 'starter' | 'pro' | 'elite',
    commission: 40,
    referrals: 0,
    earnings: 0,
    status: 'active' as 'active' | 'inactive',
    affiliateCode: '',
  });

  useEffect(() => {
    setVIPUsers(getVIPUsers());
    setAffiliateUsers(getAffiliateUsers());
  }, []);

  const handleLogout = () => {
    setAdminSession(null);
    showToast('Logged out successfully');
    onLogout();
  };

  // VIP Functions
  const handleAddVIP = () => {
    const newUser: VIPUser = {
      id: Date.now().toString(),
      name: vipForm.name,
      email: vipForm.email,
      plan: vipForm.plan,
      status: vipForm.status,
      joinedAt: new Date().toISOString().split('T')[0],
      expiresAt: vipForm.plan !== 'free' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
    };
    addVIPUser(newUser);
    setVIPUsers(getVIPUsers());
    setShowVIPModal(false);
    setVIPForm({ name: '', email: '', plan: 'free', status: 'active' });
    showToast('VIP user added successfully');
  };

  const handleUpdateVIP = () => {
    if (editingVIP) {
      updateVIPUser({
        ...editingVIP,
        name: vipForm.name,
        email: vipForm.email,
        plan: vipForm.plan,
        status: vipForm.status,
      });
      setVIPUsers(getVIPUsers());
      setShowVIPModal(false);
      setEditingVIP(null);
      setVIPForm({ name: '', email: '', plan: 'free', status: 'active' });
      showToast('VIP user updated successfully');
    }
  };

  const handleDeleteVIP = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteVIPUser(id);
      setVIPUsers(getVIPUsers());
      showToast('VIP user deleted');
    }
  };

  // Affiliate Functions
  const handleAddAffiliate = () => {
    const newAffiliate: AffiliateUser = {
      id: Date.now().toString(),
      name: affiliateForm.name,
      email: affiliateForm.email,
      tier: affiliateForm.tier,
      commission: affiliateForm.commission,
      referrals: affiliateForm.referrals,
      earnings: affiliateForm.earnings,
      status: affiliateForm.status,
      joinedAt: new Date().toISOString().split('T')[0],
      affiliateCode: affiliateForm.affiliateCode || `AFF${Date.now().toString().slice(-4)}`,
    };
    addAffiliateUser(newAffiliate);
    setAffiliateUsers(getAffiliateUsers());
    setShowAffiliateModal(false);
    setAffiliateForm({ name: '', email: '', tier: 'starter', commission: 40, referrals: 0, earnings: 0, status: 'active', affiliateCode: '' });
    showToast('Affiliate added successfully');
  };

  const handleUpdateAffiliate = () => {
    if (editingAffiliate) {
      updateAffiliateUser({
        ...editingAffiliate,
        name: affiliateForm.name,
        email: affiliateForm.email,
        tier: affiliateForm.tier,
        commission: affiliateForm.commission,
        referrals: affiliateForm.referrals,
        earnings: affiliateForm.earnings,
        status: affiliateForm.status,
        affiliateCode: affiliateForm.affiliateCode,
      });
      setAffiliateUsers(getAffiliateUsers());
      setShowAffiliateModal(false);
      setEditingAffiliate(null);
      setAffiliateForm({ name: '', email: '', tier: 'starter', commission: 40, referrals: 0, earnings: 0, status: 'active', affiliateCode: '' });
      showToast('Affiliate updated successfully');
    }
  };

  const handleDeleteAffiliate = (id: string) => {
    if (confirm('Are you sure you want to delete this affiliate?')) {
      deleteAffiliateUser(id);
      setAffiliateUsers(getAffiliateUsers());
      showToast('Affiliate deleted');
    }
  };

  // Stats
  const totalUsers = vipUsers.length;
  const activeUsers = vipUsers.filter(u => u.status === 'active').length;
  const totalAffiliates = affiliateUsers.length;
  const totalEarnings = affiliateUsers.reduce((sum, a) => sum + a.earnings, 0);
  // const totalReferrals = affiliateUsers.reduce((sum, a) => sum + a.referrals, 0);

  const filteredVIPUsers = vipUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAffiliates = affiliateUsers.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarItems = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vip' as AdminTab, label: 'VIP Users', icon: Crown },
    { id: 'affiliates' as AdminTab, label: 'Affiliates', icon: HandCoins },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="mb-8">
          <div className="font-bebas text-xl tracking-wider">
            THE <span className="text-gold">PROFITS</span> CIRCLE
          </div>
          <div className="text-xs text-white/50">Admin Portal</div>
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`admin-sidebar-link w-full ${activeTab === item.id ? 'active' : ''}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <button onClick={handleLogout} className="admin-sidebar-link w-full text-red">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-blue" />
                  <span className="text-xs text-white/50">Total Users</span>
                </div>
                <div className="font-bebas text-3xl">{totalUsers}</div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <Check className="w-5 h-5 text-green" />
                  <span className="text-xs text-white/50">Active</span>
                </div>
                <div className="font-bebas text-3xl text-green">{activeUsers}</div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <HandCoins className="w-5 h-5 text-gold" />
                  <span className="text-xs text-white/50">Affiliates</span>
                </div>
                <div className="font-bebas text-3xl text-gold">{totalAffiliates}</div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-5 h-5 text-green" />
                  <span className="text-xs text-white/50">Total Earnings</span>
                </div>
                <div className="font-bebas text-3xl text-green">£{totalEarnings.toLocaleString()}</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-bold mb-4">Recent VIP Users</h3>
                <div className="space-y-3">
                  {vipUsers.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-white/50">{user.email}</div>
                      </div>
                      <Badge 
                        variant="outline"
                        className={user.plan === 'elite' ? 'border-gold text-gold' : user.plan === 'pro' ? 'border-blue text-blue' : 'border-white/30 text-white/50'}
                      >
                        {user.plan.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="font-bold mb-4">Top Affiliates</h3>
                <div className="space-y-3">
                  {affiliateUsers
                    .sort((a, b) => b.earnings - a.earnings)
                    .slice(0, 5)
                    .map((affiliate) => (
                    <div key={affiliate.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <div className="font-medium">{affiliate.name}</div>
                        <div className="text-xs text-white/50">{affiliate.referrals} referrals</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-green">£{affiliate.earnings}</div>
                        <div className="text-xs text-white/50">{affiliate.commission}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIP Users Tab */}
        {activeTab === 'vip' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">VIP Users</h1>
              <Button 
                onClick={() => {
                  setEditingVIP(null);
                  setVIPForm({ name: '', email: '', plan: 'free', status: 'active' });
                  setShowVIPModal(true);
                }}
                className="btn btn-gold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="form-input pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVIPUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge 
                          variant="outline"
                          className={user.plan === 'elite' ? 'border-gold text-gold' : user.plan === 'pro' ? 'border-blue text-blue' : 'border-white/30 text-white/50'}
                        >
                          {user.plan.toUpperCase()}
                        </Badge>
                      </td>
                      <td>
                        <Badge 
                          variant="outline"
                          className={user.status === 'active' ? 'border-green text-green' : 'border-red text-red'}
                        >
                          {user.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td>{user.joinedAt}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingVIP(user);
                              setVIPForm({
                                name: user.name,
                                email: user.email,
                                plan: user.plan,
                                status: user.status,
                              });
                              setShowVIPModal(true);
                            }}
                            className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteVIP(user.id)}
                            className="p-2 rounded-lg hover:bg-red/10 text-white/50 hover:text-red"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Affiliates Tab */}
        {activeTab === 'affiliates' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Affiliates</h1>
              <Button 
                onClick={() => {
                  setEditingAffiliate(null);
                  setAffiliateForm({ name: '', email: '', tier: 'starter', commission: 40, referrals: 0, earnings: 0, status: 'active', affiliateCode: '' });
                  setShowAffiliateModal(true);
                }}
                className="btn btn-green"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Affiliate
              </Button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search affiliates..."
                  className="form-input pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Affiliates Table */}
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Tier</th>
                    <th>Commission</th>
                    <th>Referrals</th>
                    <th>Earnings</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAffiliates.map((affiliate) => (
                    <tr key={affiliate.id}>
                      <td>{affiliate.name}</td>
                      <td>
                        <code className="text-xs bg-white/5 px-2 py-1 rounded">{affiliate.affiliateCode}</code>
                      </td>
                      <td>
                        <Badge 
                          variant="outline"
                          className={affiliate.tier === 'elite' ? 'border-gold text-gold' : affiliate.tier === 'pro' ? 'border-blue text-blue' : 'border-white/30 text-white/50'}
                        >
                          {affiliate.tier.toUpperCase()}
                        </Badge>
                      </td>
                      <td>{affiliate.commission}%</td>
                      <td>{affiliate.referrals}</td>
                      <td className="text-green">£{affiliate.earnings}</td>
                      <td>
                        <Badge 
                          variant="outline"
                          className={affiliate.status === 'active' ? 'border-green text-green' : 'border-red text-red'}
                        >
                          {affiliate.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingAffiliate(affiliate);
                              setAffiliateForm({
                                name: affiliate.name,
                                email: affiliate.email,
                                tier: affiliate.tier,
                                commission: affiliate.commission,
                                referrals: affiliate.referrals,
                                earnings: affiliate.earnings,
                                status: affiliate.status,
                                affiliateCode: affiliate.affiliateCode,
                              });
                              setShowAffiliateModal(true);
                            }}
                            className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAffiliate(affiliate.id)}
                            className="p-2 rounded-lg hover:bg-red/10 text-white/50 hover:text-red"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* VIP Modal */}
      {showVIPModal && (
        <div className="modal-overlay open" onClick={() => setShowVIPModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-xl font-bold">{editingVIP ? 'Edit VIP User' : 'Add VIP User'}</h3>
              <button onClick={() => setShowVIPModal(false)} className="modal-close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={vipForm.name}
                  onChange={(e) => setVIPForm({ ...vipForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={vipForm.email}
                  onChange={(e) => setVIPForm({ ...vipForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Plan</label>
                <select
                  className="form-select"
                  value={vipForm.plan}
                  onChange={(e) => setVIPForm({ ...vipForm, plan: e.target.value as 'free' | 'pro' | 'elite' })}
                >
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                  <option value="elite">Elite</option>
                </select>
              </div>
              <div>
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={vipForm.status}
                  onChange={(e) => setVIPForm({ ...vipForm, status: e.target.value as 'active' | 'inactive' })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <Button
                onClick={editingVIP ? handleUpdateVIP : handleAddVIP}
                className="w-full btn btn-gold"
              >
                {editingVIP ? 'Update User' : 'Add User'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Affiliate Modal */}
      {showAffiliateModal && (
        <div className="modal-overlay open" onClick={() => setShowAffiliateModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-xl font-bold">{editingAffiliate ? 'Edit Affiliate' : 'Add Affiliate'}</h3>
              <button onClick={() => setShowAffiliateModal(false)} className="modal-close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={affiliateForm.name}
                  onChange={(e) => setAffiliateForm({ ...affiliateForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={affiliateForm.email}
                  onChange={(e) => setAffiliateForm({ ...affiliateForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Tier</label>
                <select
                  className="form-select"
                  value={affiliateForm.tier}
                  onChange={(e) => setAffiliateForm({ 
                    ...affiliateForm, 
                    tier: e.target.value as 'starter' | 'pro' | 'elite',
                    commission: e.target.value === 'starter' ? 40 : e.target.value === 'pro' ? 45 : 50
                  })}
                >
                  <option value="starter">Starter (40%)</option>
                  <option value="pro">Pro (45%)</option>
                  <option value="elite">Elite (50%)</option>
                </select>
              </div>
              <div>
                <label className="form-label">Affiliate Code</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Auto-generated if empty"
                  value={affiliateForm.affiliateCode}
                  onChange={(e) => setAffiliateForm({ ...affiliateForm, affiliateCode: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={affiliateForm.status}
                  onChange={(e) => setAffiliateForm({ ...affiliateForm, status: e.target.value as 'active' | 'inactive' })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <Button
                onClick={editingAffiliate ? handleUpdateAffiliate : handleAddAffiliate}
                className="w-full btn btn-green"
              >
                {editingAffiliate ? 'Update Affiliate' : 'Add Affiliate'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
