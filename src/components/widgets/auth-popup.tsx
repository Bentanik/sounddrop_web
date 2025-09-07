"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Popup from "@/components/ui/popup"
import { useAuthPopup } from "@/hooks/use-popup-store"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"

interface AuthPopupProps {
    onSuccess?: (user: any) => void
}

export default function AuthPopup({ onSuccess }: AuthPopupProps) {
    const { isAuthPopupOpen, closeAuthPopup } = useAuthPopup()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Form states
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            console.log("Login:", { email: formData.email, password: formData.password })
            const user = { email: formData.email, name: "User", isAuthenticated: true }
            onSuccess?.(user)

            closeAuthPopup()
        } catch (error) {
            console.error("Login error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleForgotPassword = () => {
        // Handle forgot password
        console.log("Forgot password clicked")
    }

    const handleRegister = () => {
        // Handle register
        console.log("Register clicked")
    }

    return (
        <Popup
            isOpen={isAuthPopupOpen}
            onClose={closeAuthPopup}
            title="Đăng nhập"
            size="lg"
            className="max-w-lg"
            closeOnOverlayClick={true}
            closeOnEscape={true}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
            >

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    {/* Email Input */}
                    <motion.div
                        className="relative group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-white transition-colors" />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/60 focus:border-white/30 focus:bg-white/10 transition-all duration-200 rounded-xl text-base"
                            required
                        />
                    </motion.div>

                    {/* Password Input */}
                    <motion.div
                        className="relative group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                    >
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-white transition-colors" />
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mật khẩu"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className="pl-12 pr-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/60 focus:border-white/30 focus:bg-white/10 transition-all duration-200 rounded-xl text-base"
                            required
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-9 h-9 btn-smooth hover:bg-white/10 rounded-lg"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5 text-muted-foreground" />
                            ) : (
                                <Eye className="w-5 h-5 text-muted-foreground" />
                            )}
                        </Button>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                    >
                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-base"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <motion.div
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <motion.div
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    Đang đăng nhập...
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="flex items-center gap-3"
                                    whileHover={{ x: 2 }}
                                >
                                    Đăng nhập
                                    <ArrowRight className="w-5 h-5" />
                                </motion.div>
                            )}
                        </Button>
                    </motion.div>

                    {/* Bottom Links */}
                    <motion.div
                        className="flex items-center justify-between text-sm pt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                    >
                        <button
                            type="button"
                            className="text-white/70 hover:text-white transition-colors font-medium"
                            onClick={handleForgotPassword}
                        >
                            Quên mật khẩu?
                        </button>

                        <button
                            type="button"
                            className="text-white/70 hover:text-white transition-colors font-medium"
                            onClick={handleRegister}
                        >
                            Chưa có tài khoản? Đăng ký
                        </button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </Popup>
    )
}
