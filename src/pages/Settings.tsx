import { useAppSelector } from "../store/hooks";

export default function Settings() {

const userData=useAppSelector((state)=>state.user.userData);

console.log('User data:',userData);
   
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
            </div>
        </div>
    )

}