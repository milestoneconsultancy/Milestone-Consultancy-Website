import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';
import { SiteLayout } from "@/components/layout/SiteLayout";
import { company } from "@/config/company";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export const Route = createFileRoute("/employee-login")({
  head: () => ({
    meta: [
      { title: `Employee Login | ${company.name}` },
      {
        name: "description",
        content: "Employee login portal for Milestone Consultancy",
      },
    ],
  }),
  component: EmployeeLoginPage,
});

// ✅ Supabase Client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ✅ EmailJS Config
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_ADMIN_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ✅ Admin Email
const ADMIN_EMAIL = "milestoneconsultancyllp@gmail.com";

// ✅ Contact Us Template ID
const CONTACT_US_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;

function EmployeeLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Forgot Password States
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetStep, setResetStep] = useState(1);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Registration States
  const [showRegister, setShowRegister] = useState(false);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regDepartment, setRegDepartment] = useState("General");
  const [regRole, setRegRole] = useState("Employee");
  const [regMessage, setRegMessage] = useState("");
  const [regError, setRegError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // ============================================
  // RESEND TIMER
  // ============================================
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  // ============================================
  // SEND ADMIN NOTIFICATION EMAIL
  // ============================================
  const sendAdminNotification = async (userName: string, userEmail: string, userDepartment: string) => {
    try {
      const templateParams = {
        to_email: ADMIN_EMAIL,
        user_name: userName,
        user_email: userEmail,
        user_department: userDepartment || 'General',
        registered_at: new Date().toLocaleString(),
        approve_url: `${window.location.origin}/admin/approve?email=${encodeURIComponent(userEmail)}`,
        reject_url: `${window.location.origin}/admin/reject?email=${encodeURIComponent(userEmail)}`,
        dashboard_url: `${window.location.origin}/admin-dashboard`
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('✅ Admin notification sent successfully');
    } catch (error) {
      console.error('❌ Failed to send admin notification:', error);
    }
  };

  // ============================================
  // SEND CONTACT US EMAIL (Registration साठी)
  // ============================================
  const sendContactUsEmail = async (userName: string, userEmail: string) => {
    try {
      const templateParams = {
        from_name: userName,
        from_email: userEmail,
        phone: 'N/A',
        subject: '🆕 New User Registration',
        message: `A new user has registered on the website.\n\nName: ${userName}\nEmail: ${userEmail}\n\nPlease login to admin panel to approve or reject this registration.\n\n🔗 Admin Dashboard: ${window.location.origin}/admin-dashboard`
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        CONTACT_US_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('✅ Contact Us email sent successfully');
    } catch (error) {
      console.error('❌ Failed to send Contact Us email:', error);
    }
  };

  // ============================================
  // LOGIN HANDLER
  // ============================================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (error || !data) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      // ✅ Check Status
      if (data.status === 'Pending') {
        setError("Your account is pending approval. You will receive an email once approved.");
        setIsLoading(false);
        return;
      }

      if (data.status === 'Rejected') {
        setError("Your account has been rejected. Contact admin.");
        setIsLoading(false);
        return;
      }

      if (data.status === 'Inactive') {
        setError("Your account is inactive. Contact admin.");
        setIsLoading(false);
        return;
      }

      // ✅ Login Successful
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", data.name || "");
      localStorage.setItem("userRole", data.role || "");
      localStorage.setItem("userDepartment", data.department || "");

      window.location.href = "https://sites.google.com/view/milestone-consultancy/home";

    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please check your connection.");
      setIsLoading(false);
    }
  };

  // ============================================
  // REGISTER HANDLER (with Admin Approval)
  // ============================================
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    setRegMessage("");
    setIsRegistering(true);

    if (!regName || !regEmail || !regPassword || !regConfirmPassword) {
      setRegError("Please fill in all fields");
      setIsRegistering(false);
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError("Passwords do not match");
      setIsRegistering(false);
      return;
    }

    if (regPassword.length < 4) {
      setRegError("Password must be at least 4 characters");
      setIsRegistering(false);
      return;
    }

    try {
      // Check if user exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', regEmail)
        .single();

      if (existingUser) {
        setRegError("User already exists. Please login.");
        setIsRegistering(false);
        return;
      }

      // Insert new user with Pending status
      const { error } = await supabase
        .from('users')
        .insert([
          {
            email: regEmail,
            password: regPassword,
            name: regName,
            department: regDepartment || 'General',
            role: 'Employee',
            status: 'Pending'  // ✅ Admin Approval Required
          }
        ]);

      if (error) {
        setRegError("Registration failed: " + error.message);
        setIsRegistering(false);
        return;
      }

      // ✅ Send Admin Notification (Approve/Reject)
      await sendAdminNotification(regName, regEmail, regDepartment);

      // ✅ Send Contact Us Email (New User Notification)
      await sendContactUsEmail(regName, regEmail);

      setRegMessage("Registration successful! You will receive an email once admin approves your account.");
      setTimeout(() => {
        setShowRegister(false);
        setRegName("");
        setRegEmail("");
        setRegPassword("");
        setRegConfirmPassword("");
        setRegDepartment("General");
        setRegRole("Employee");
        setRegMessage("");
        setRegError("");
        setIsRegistering(false);
      }, 3000);

    } catch (error) {
      console.error("Registration error:", error);
      setRegError("Network error. Please try again.");
      setIsRegistering(false);
    }
  };

  // ============================================
  // SEND OTP
  // ============================================
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetMessage("");

    if (!resetEmail) {
      setResetError("Please enter your email address");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', resetEmail)
        .single();

      if (error || !data) {
        setResetError("Email not found. Please register first.");
        return;
      }

      // Generate OTP (6 digit)
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      
      sessionStorage.setItem('resetOTP', generatedOtp);
      sessionStorage.setItem('resetEmail', resetEmail);
      sessionStorage.setItem('resetExpiry', (Date.now() + 5 * 60 * 1000).toString());

      setResetMessage("OTP sent to your email: " + generatedOtp);
      setResetStep(2);
      setResendTimer(30);

    } catch (error) {
      console.error("Send OTP error:", error);
      setResetError("Network error. Please try again.");
    }
  };

  // ============================================
  // RESEND OTP
  // ============================================
  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setResetError("");
    setResetMessage("");

    try {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      
      sessionStorage.setItem('resetOTP', generatedOtp);
      sessionStorage.setItem('resetExpiry', (Date.now() + 5 * 60 * 1000).toString());

      setResetMessage("New OTP sent: " + generatedOtp);
      setResendTimer(30);

    } catch (error) {
      console.error("Resend OTP error:", error);
      setResetError("Network error. Please try again.");
    }
  };

  // ============================================
  // VERIFY OTP
  // ============================================
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetMessage("");

    if (!otp) {
      setResetError("Please enter OTP");
      return;
    }

    const storedOTP = sessionStorage.getItem('resetOTP');
    const storedEmail = sessionStorage.getItem('resetEmail');
    const storedExpiry = sessionStorage.getItem('resetExpiry');

    if (!storedOTP || !storedEmail) {
      setResetError("No OTP request found. Please request OTP first.");
      return;
    }

    if (Date.now() > parseInt(storedExpiry || '0')) {
      setResetError("OTP expired. Please request new OTP.");
      return;
    }

    if (storedOTP !== otp) {
      setResetError("Invalid OTP. Please try again.");
      return;
    }

    setResetMessage("OTP verified successfully");
    setResetStep(3);
  };

  // ============================================
  // RESET PASSWORD
  // ============================================
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetMessage("");

    if (!newPassword || !confirmPassword) {
      setResetError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match");
      return;
    }

    if (newPassword.length < 4) {
      setResetError("Password must be at least 4 characters");
      return;
    }

    const storedEmail = sessionStorage.getItem('resetEmail');

    try {
      const { error } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('email', storedEmail);

      if (error) {
        setResetError("Failed to reset password");
        return;
      }

      setResetMessage("Password reset successfully");
      sessionStorage.removeItem('resetOTP');
      sessionStorage.removeItem('resetEmail');
      sessionStorage.removeItem('resetExpiry');

      setTimeout(() => {
        setShowForgotPassword(false);
        setResetStep(1);
        setResetEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setResetMessage("");
        setResetError("");
      }, 2000);

    } catch (error) {
      console.error("Reset password error:", error);
      setResetError("Network error. Please try again.");
    }
  };

  // ============================================
  // CLOSE RESET MODAL
  // ============================================
  const closeResetModal = () => {
    setShowForgotPassword(false);
    setResetStep(1);
    setResetEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setResetMessage("");
    setResetError("");
    setResendTimer(0);
    sessionStorage.removeItem('resetOTP');
    sessionStorage.removeItem('resetEmail');
    sessionStorage.removeItem('resetExpiry');
  };

  // ============================================
  // CLOSE REGISTER MODAL
  // ============================================
  const closeRegisterModal = () => {
    setShowRegister(false);
    setRegName("");
    setRegEmail("");
    setRegPassword("");
    setRegConfirmPassword("");
    setRegDepartment("General");
    setRegRole("Employee");
    setRegMessage("");
    setRegError("");
    setIsRegistering(false);
  };

  return (
    <SiteLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-[var(--shadow-elegant)] border border-border overflow-hidden">
            <div className="bg-[color:var(--color-brand-navy)] px-8 py-6 text-center">
              <h1 className="text-2xl font-bold text-white">🔐 Employee Login</h1>
              <p className="text-white/70 text-sm mt-1">
                Access your employee dashboard
              </p>
            </div>

            <div className="p-8">
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}
              {successMessage && (
                <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="employee@milestone.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-[color:var(--color-brand-orange)] hover:underline"
                  >
                    Forgot Password?
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRegister(true)}
                    className="text-sm text-[color:var(--color-brand-navy)] hover:underline"
                  >
                    New User? Register
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white font-medium"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-center text-muted-foreground mt-6">
                Contact admin if you face any issues
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
          FORGOT PASSWORD MODAL
          ============================================ */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-up max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[color:var(--color-brand-navy)]">
                🔑 Reset Password
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {resetStep === 1 && "Enter your email to receive OTP"}
                {resetStep === 2 && "Enter OTP sent to your email"}
                {resetStep === 3 && "Set your new password"}
              </p>
            </div>

            {resetMessage && (
              <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">
                {resetMessage}
              </div>
            )}
            {resetError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {resetError}
              </div>
            )}

            {resetStep === 1 && (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <Label htmlFor="resetEmail" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    placeholder="employee@milestone.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="mt-1.5 h-11"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white h-11"
                >
                  Send OTP
                </Button>
              </form>
            )}

            {resetStep === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                    Enter OTP
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1.5 h-11"
                    maxLength={6}
                    required
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-muted-foreground">
                      OTP sent to {resetEmail}
                    </p>
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={resendTimer > 0}
                      className={`text-xs ${
                        resendTimer > 0
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-[color:var(--color-brand-orange)] hover:underline"
                      }`}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                    </button>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1 rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white"
                  >
                    Verify OTP
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setResetStep(1)}
                    className="flex-1 rounded-full"
                  >
                    Back
                  </Button>
                </div>
              </form>
            )}

            {resetStep === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1.5 h-11"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1.5 h-11"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1 rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white"
                  >
                    Reset Password
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setResetStep(1)}
                    className="flex-1 rounded-full"
                  >
                    Back
                  </Button>
                </div>
              </form>
            )}

            <Button
              type="button"
              variant="ghost"
              onClick={closeResetModal}
              className="w-full mt-4 text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* ============================================
          REGISTER MODAL
          ============================================ */}
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-up max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[color:var(--color-brand-navy)]">
                📝 New User Registration
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Create your account. Admin approval required.
              </p>
            </div>

            {regMessage && (
              <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">
                {regMessage}
              </div>
            )}
            {regError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {regError}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="regName" className="text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="regName"
                  type="text"
                  placeholder="John Doe"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="mt-1.5 h-11"
                  required
                />
              </div>

              <div>
                <Label htmlFor="regEmail" className="text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="regEmail"
                  type="email"
                  placeholder="employee@milestone.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="mt-1.5 h-11"
                  required
                />
              </div>

              <div>
                <Label htmlFor="regPassword" className="text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="regPassword"
                  type="password"
                  placeholder="Min 4 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="mt-1.5 h-11"
                  required
                />
              </div>

              <div>
                <Label htmlFor="regConfirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="regConfirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  className="mt-1.5 h-11"
                  required
                />
              </div>

              <div>
                <Label htmlFor="regDepartment" className="text-sm font-medium text-gray-700">
                  Department
                </Label>
                <select
                  id="regDepartment"
                  value={regDepartment}
                  onChange={(e) => setRegDepartment(e.target.value)}
                  className="mt-1.5 w-full h-11 px-3 rounded-md border border-border bg-background"
                >
                  <option value="General">General</option>
                  <option value="Admin">Admin</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Projects">Projects</option>
                  <option value="Marketing">Marketing</option>
                  <option value="IT">IT</option>
                </select>
              </div>

              <div>
                <Label htmlFor="regRole" className="text-sm font-medium text-gray-700">
                  Role
                </Label>
                <select
                  id="regRole"
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="mt-1.5 w-full h-11 px-3 rounded-md border border-border bg-background"
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isRegistering}
                  className="flex-1 rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white h-11"
                >
                  {isRegistering ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeRegisterModal}
                  className="flex-1 rounded-full"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}