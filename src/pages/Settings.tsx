import { ArrowLeft } from "lucide-react";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";

export default function Settings() {

    const userData=useAppSelector((state) => state.user.userData);

    const navigate = useNavigate();
   
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4">Ayarlar</h2>
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Kullanıcı Bilgileri</h3>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">Ad:</span>
                            <span>{userData?.firstName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">Soyad:</span>
                            <span>{userData?.lastName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">E-posta:</span>
                            <span>{userData?.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">Telefon:</span>
                            <span>{userData?.telephone}</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Astrolojik Bilgileriniz</h3>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">Doğum Tarihi ve Saati:</span>
                            <span>{userData?.birthDay}/{}{userData?.birthMonth}/{userData?.birthYear}{' '}{userData?.birthHour}:{userData?.birthMinute}</span>
                            <span>{userData?.city}- lat:{}{userData?.latitude}:lot:{userData?.longitude}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">Rolleriniz:</span>
                            <span>{userData?.roles.join(", ")}</span>
                        </div>
                    </div>
                </div>
                <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center gap-2 bg-EF7874 text-white px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
          Geri Dön
        </button>
            </div>
        </div>
    )

}