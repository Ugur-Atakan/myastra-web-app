import { getLocalizedName, getZodiacEmoji } from "../../utils/astrology";
import { Download, FileText } from "lucide-react";
import { formatOrderStatus } from "../../utils/common";
import { UserReport } from "../../types/report";

interface ZodiacSignsProps {
  sunSign: string;
  name: string;
  latestOrder: UserReport | undefined;
}
function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default function HeroSection({
  sunSign,
  name,
  latestOrder,
}: ZodiacSignsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Hoşgeldin {capitalizeFirstLetter(name)}
      </h2>
      <h2 className="text-lg font-semibold text-gray-500 mb-4">
        Bu gün ışık saçıyorsun! 🌞
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-FDEAE9 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl" role="img" aria-label={sunSign}>
              {getZodiacEmoji(sunSign)}
            </span>
            <div>
              <p className="text-sm text-gray-600">Güneş Burcu</p>
              <p className="font-medium text-gray-900">
                {getLocalizedName(sunSign)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-FDEAE9 rounded-xl p-4">
            <h2 className="text-md font-semibold text-gray-900">Son Raporum</h2>
            {latestOrder ? (
            <div className="flex items-center gap-2 mt-2">
          <FileText className="h-6 w-6 text-EF7874" />
          <div className="flex gap-2 flex-auto items-center">
            <p className="font-medium text-gray-900">
              {latestOrder.packageName}
            </p>
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                latestOrder.status === "COMPLETED"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {formatOrderStatus(latestOrder.status)}
            </div>
            {latestOrder.status === "COMPLETED" && (
              <a
                href={latestOrder.documentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-EF7874 text-white px-2 py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                <Download className="h-4 w-4" />
                Raporu İndir
              </a>
            )}
          </div>
              </div>
            ) : (
              <p className="text-gray-600">Henüz bir raporunuz bulunmuyor</p>
            )}
          </div>
        </div>
    </div>
  );
}
