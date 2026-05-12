import React, { useState, useEffect } from 'react';
import SideNavBar from '../components/layout/SideNavBar';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { FloatingShapes, GlowOrbs } from '../components/animations/Animations3D';

export default function ProfilePage() {
  const { user } = useAuth();

  // Profile form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [branch, setBranch] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [github, setGithub] = useState('');

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || '');
      setEmail(user.email || '');
      setPhone(user.user_metadata?.phone || '');
      setCollege(user.user_metadata?.college || '');
      setGraduationYear(user.user_metadata?.graduation_year || '');
      setBranch(user.user_metadata?.branch || '');
      setLinkedIn(user.user_metadata?.linkedin || '');
      setGithub(user.user_metadata?.github || '');
    }
  }, [user]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg(null);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: phone,
          college: college,
          graduation_year: graduationYear,
          branch: branch,
          linkedin: linkedIn,
          github: github,
        }
      });

      if (error) throw error;
      setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.message });
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordSaving(true);
    setPasswordMsg(null);

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      setPasswordSaving(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      setPasswordSaving(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      setPasswordMsg({ type: 'success', text: 'Password changed successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordMsg({ type: 'error', text: err.message });
    } finally {
      setPasswordSaving(false);
    }
  };

  const initials = fullName
    ? fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : email?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="flex bg-surface min-h-screen text-on-surface">
      <SideNavBar />

      <main className="md:ml-64 flex-1 flex flex-col min-h-screen overflow-y-auto no-scrollbar relative">
        <FloatingShapes variant="ambient" />
        <GlowOrbs count={2} />

        {/* Header */}
        <header className="px-6 md:px-10 pt-10 pb-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6 anim-fade-in-up anim-delay-1">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center text-white font-headline font-extrabold text-3xl shadow-2xl shadow-primary-container/30 anim-pulse-glow">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center border-2 border-surface">
                <span className="material-symbols-outlined text-white text-xs" style={{fontVariationSettings: "'FILL' 1"}}>check</span>
              </div>
            </div>
            <div>
              <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-on-surface">
                {fullName || 'Your Profile'}
              </h1>
              <p className="text-on-surface-variant text-sm mt-1">{email}</p>
              <span className="inline-block mt-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-primary/20">
                Premium Member
              </span>
            </div>
          </div>
        </header>

        {/* Tab Switcher */}
        <div className="px-6 md:px-10 relative z-10">
          <div className="flex gap-1 bg-surface-container-low rounded-xl p-1 w-fit glass-edge anim-fade-in-up anim-delay-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-2.5 rounded-lg font-headline text-sm font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">person</span>
                Profile Details
              </span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-2.5 rounded-lg font-headline text-sm font-semibold transition-all ${
                activeTab === 'security'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">shield_lock</span>
                Security
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        <section className="p-6 md:p-10 flex-grow relative z-10">

          {/* ===== PROFILE TAB ===== */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="max-w-4xl space-y-8 anim-fade-in-up anim-delay-3">

              {/* Status Message */}
              {profileMsg && (
                <div className={`p-4 rounded-xl text-sm font-semibold ${
                  profileMsg.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500 text-emerald-400'
                    : 'bg-red-500/10 border border-red-500 text-red-400'
                }`}>
                  {profileMsg.text}
                </div>
              )}

              {/* Personal Info */}
              <div className="bg-surface-container-low rounded-xl p-8 glass-edge anim-hover-lift">
                <h2 className="font-headline text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">badge</span>
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#0b1326] border border-[#464555] rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full bg-[#0b1326]/50 border border-[#464555]/50 rounded-xl px-5 py-3.5 text-slate-500 cursor-not-allowed"
                    />
                    <p className="text-[10px] text-slate-500 mt-1.5 px-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0b1326] border border-[#464555] rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="bg-surface-container-low rounded-xl p-8 glass-edge anim-hover-lift">
                <h2 className="font-headline text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">school</span>
                  Academic Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">College / University</label>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full bg-[#0b1326] border border-[#464555] rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                      placeholder="e.g. IIT Bombay"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">Branch / Major</label>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full bg-[#0b1326] border border-[#464555] rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">Graduation Year</label>
                    <input
                      type="text"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="w-full bg-[#0b1326] border border-[#464555] rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                      placeholder="e.g. 2026"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-surface-container-low rounded-xl p-8 glass-edge anim-hover-lift">
                <h2 className="font-headline text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary">link</span>
                  Social Profiles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">LinkedIn URL</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">linkedin.com/in/</span>
                      <input
                        type="text"
                        value={linkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                        className="w-full bg-[#0b1326] border border-[#464555] rounded-xl pl-[130px] pr-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                        placeholder="username"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">GitHub URL</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">github.com/</span>
                      <input
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="w-full bg-[#0b1326] border border-[#464555] rounded-xl pl-[100px] pr-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                        placeholder="username"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="px-10 py-4 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl font-headline font-bold text-white shadow-lg shadow-primary-container/20 hover:scale-[1.02] transition-transform active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
                >
                  {profileSaving ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">save</span>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ===== SECURITY TAB ===== */}
          {activeTab === 'security' && (
            <div className="max-w-2xl space-y-8 anim-fade-in-up anim-delay-3">

              {/* Status Message */}
              {passwordMsg && (
                <div className={`p-4 rounded-xl text-sm font-semibold ${
                  passwordMsg.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500 text-emerald-400'
                    : 'bg-red-500/10 border border-red-500 text-red-400'
                }`}>
                  {passwordMsg.text}
                </div>
              )}

              {/* Change Password */}
              <form onSubmit={handlePasswordChange} className="bg-surface-container-low rounded-xl p-8 glass-edge anim-hover-lift">
                <h2 className="font-headline text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">lock_reset</span>
                  Change Password
                </h2>
                <p className="text-on-surface-variant text-sm mb-8">Update your password to keep your account secure.</p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-[#0b1326] border border-[#464555] rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#0b1326] border border-[#464555] rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <p className="text-[10px] text-slate-500 mt-1.5 px-1">Minimum 6 characters</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 px-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full bg-[#0b1326] border rounded-xl px-5 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                        confirmPassword && confirmPassword !== newPassword
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-[#464555] focus:border-[#4f46e5] focus:ring-[#4f46e5]'
                      }`}
                      placeholder="••••••••"
                      required
                    />
                    {confirmPassword && confirmPassword !== newPassword && (
                      <p className="text-[10px] text-red-400 mt-1.5 px-1">Passwords don't match</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    disabled={passwordSaving || (confirmPassword && confirmPassword !== newPassword)}
                    className="px-8 py-3.5 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl font-headline font-bold text-white shadow-lg shadow-primary-container/20 hover:scale-[1.02] transition-transform active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
                  >
                    {passwordSaving ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-sm">shield_lock</span>
                        Update Password
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Account Info */}
              <div className="bg-surface-container-low rounded-xl p-8 glass-edge anim-hover-lift">
                <h2 className="font-headline text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant">info</span>
                  Account Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-outline-variant/15">
                    <div>
                      <p className="text-sm font-semibold text-white">Account ID</p>
                      <p className="text-xs text-on-surface-variant font-mono mt-0.5">{user?.id?.slice(0, 16)}...</p>
                    </div>
                    <button
                      onClick={() => { navigator.clipboard.writeText(user?.id || ''); }}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-outline-variant/15">
                    <div>
                      <p className="text-sm font-semibold text-white">Sign-in Method</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{user?.app_metadata?.provider || 'email'}</p>
                    </div>
                    <span className="material-symbols-outlined text-emerald-400 text-sm" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Member Since</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-primary text-sm">calendar_month</span>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-500/5 rounded-xl p-8 border border-red-500/20">
                <h2 className="font-headline text-xl font-bold text-red-400 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">warning</span>
                  Danger Zone
                </h2>
                <p className="text-on-surface-variant text-sm mb-6">Once deleted, your account and all data will be permanently removed. This action cannot be undone.</p>
                <button className="px-6 py-3 border border-red-500/40 text-red-400 rounded-xl font-headline font-semibold text-sm hover:bg-red-500/10 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </section>

        <div className="h-16 md:h-0"></div>
      </main>
    </div>
  );
}
