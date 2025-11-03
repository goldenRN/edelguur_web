"use client";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className=" text-gray-300 pt-10 mt-10 font-light tracking-wide w-full shadow-inner border-b border-gray-200">
            {/* --- Дээд хэсэг --- */}
            
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left">

                {/* Хаяг */}
                <div>
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2 mb-2 text-base text-black font-normal uppercase tracking-wider">
                            <MapPinIcon size={18} />
                            <span>ХАЯГ БАЙРШИЛ</span>
                        </div>
                        <p className="text-base text-gray-400 leading-relaxed">
                            Улаанбаатар, Хан-Уул дүүрэг, 2-р хороо
                        </p>
                    </div>
                </div>

                {/* Холбоо барих */}
                <div>
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2 mb-2 text-base text-black font-normal uppercase tracking-wider">
                            <MailIcon size={18} />
                            <span>ХОЛБОО БАРИХ</span>
                        </div>
                        <p className="text-base text-gray-400">
                            Имэйл:{" "}
                            <a
                                href="mailto:ankhtubayar@urnukhbarilga.com"
                                className="hover:text-cyan-400 transition-colors duration-200"
                            >
                                ankhtubayar@urnukhbarilga.com
                            </a>
                        </p>
                        <p className="text-base text-gray-400">
                            Утас:{" "}
                            <a
                                href="tel:+97660303468"
                                className="hover:text-cyan-400 transition-colors duration-200"
                            >
                                +976 60303468
                            </a>
                        </p>
                    </div>
                </div>


            </div>

            {/* --- Доод хэсэг --- */}
            <div className=" bg-[#1d3b86] border-t border-gray-700 mt-10 pt-6 pb-6 text-center">
                {/* Соц сүлжээ */}
                {/* <div>
                    <div className=" bg-green flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2 mb-2 text-base text-white font-normal uppercase tracking-wider">
                            <span>БИДЭНТЭЙ НЭГДЭХ</span>
                        </div>
                        <div className="flex justify-center md:justify-start space-x-5 mt-1">
                            <a href="#" className="hover:text-cyan-400 hover:scale-110 transition-transform duration-200"><Facebook size={18} /></a>
                            <a href="#" className="hover:text-cyan-400 hover:scale-110 transition-transform duration-200"><Twitter size={18} /></a>
                            <a href="#" className="hover:text-cyan-400 hover:scale-110 transition-transform duration-200"><Linkedin size={18} /></a>
                            <a href="#" className="hover:text-cyan-400 hover:scale-110 transition-transform duration-200"><Instagram size={18} /></a>
                            <a href="#" className="hover:text-cyan-400 hover:scale-110 transition-transform duration-200"><Youtube size={18} /></a>
                        </div>
                    </div>
                </div> */}
                <p className="text-sm md:text-base text-gray-400">
                    © 2025 <span className="text-white font-light">Өрнөх Барилга ХХК</span>, бүх эрх хуулиар хамгаалагдсан
                </p>
                <p className="text-sm mt-1 text-gray-500">
                    Website designed by <span className="text-cyan-400">Binarysoft LLC</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;


// "use client";
// import {
//     MailIcon,
//     PhoneIcon,
//     MapPinIcon,
//     Facebook,
//     Instagram,
//     Youtube,
//     Linkedin,
//     Twitter,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// const Footer = () => {
//     return (
//         <footer className="bg-[#054b13] text-green-50 w-full pt-10" style={{ fontFamily: 'RobotoBold' }}>
//             {/* --- Дээд хэсэг: Logo ба танилцуулга --- */}
//             <div className="flex flex-col items-center text-center">
//                 <Image
//                     src="/agro_logo.jpg"
//                     width={160}
//                     height={160}
//                     alt="AgroCity Logo"
//                     className="rounded-xl"
//                 />
//                 <div className="flex space-x-5 mb-4 md:mb-0">
//                     {[
//                         { Icon: Facebook, color: "hover:text-blue-400" },
//                         { Icon: Twitter, color: "hover:text-sky-400" },
//                         { Icon: Linkedin, color: "hover:text-blue-500" },
//                         { Icon: Instagram, color: "hover:text-pink-400" },
//                         { Icon: Youtube, color: "hover:text-red-500" },
//                     ].map(({ Icon, color }, i) => (
//                         <a
//                             key={i}
//                             href="#"
//                             className={`${color} transition-transform transform hover:scale-125 duration-200`}
//                         >
//                             <Icon size={22} />
//                         </a>
//                     ))}
//                 </div>
//                 {/* <p className="text-lg md:text-md max-w-2xl text-white leading-relaxed" style={{ fontFamily: 'RobotoRegular' }}>
//           Ухаалаг хөдөө аж ахуйн дижитал экосистем. 
//           Инновац, өгөгдөлд суурилсан шийдвэр, тогтвортой хөгжил.
//         </p> */}
//             </div>

//             {/* --- Дунд хэсэг: 3 багана --- */}
//             <section className=" grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-10">
//                 <div className="p-6 text-right">
//                     <h3
//                         className="text-lg text-lime-300 mb-2"
//                         style={{ fontFamily: 'RobotoBold' }}
//                     >
//                         Холбоо барих
//                     </h3>

//                     <ul className="space-y-3 text-white text-right">
//                         <li className="flex justify-end items-center gap-2">
//                             <MailIcon size={18} className="text-green-300" />
//                             <a
//                                 href="mailto:agrocity@ub.gov.mn"
//                                 className="hover:text-white transition-colors duration-200"
//                                 style={{ fontFamily: 'RobotoBold' }}
//                             >
//                                 agrocity@ub.gov.mn
//                             </a>
//                         </li>

//                         <li className="flex justify-end items-center gap-2">
//                             <PhoneIcon size={18} className="text-green-300" />
//                             <a
//                                 href="tel:+9760000000"
//                                 className="hover:text-white transition-colors duration-200"
//                             >
//                                 +976 0000000
//                             </a>
//                         </li>
//                     </ul>
//                 </div>

//                 <div className="p-6  text-center">
//                     <h3 className="text-lg font-roboto-bold text-lime-300 mb-2" style={{ fontFamily: 'RobotoBold' }}>Хаяг байрлал</h3>
//                     <ul className="space-y-3 text-white items-center text-center ">
//                         <li className="flex justify-center md:justify-center items-center gap-2">
//                             <MapPinIcon size={18} className="text-green-300"/>
//                             <span style={{ fontFamily: 'RobotoBold' }}>Улаанбаатар хот, Монгол улс</span>
//                         </li>
//                         <li style={{ fontFamily: 'RobotoBold' }}>Нийслэлийн хөгжлийн газар</li>
//                     </ul>
//                 </div>
//                 <div className="p-6">
//                     <h3 className="text-lg font-roboto-bold text-lime-300 mb-2" style={{ fontFamily: 'RobotoBold' }}>Холбоосууд</h3>
//                     <ul className="text-base text-white list-disc list-inside space-y-1" style={{ fontFamily: 'RobotoRegular' }}>
//                         <li >
//                             <Link href="/about" className="hover:text-lime-400 transition" style={{ fontFamily: 'RobotoBold' }}>
//                                 Бидний тухай
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/services" className="hover:text-lime-400 transition" style={{ fontFamily: 'RobotoBold' }}>
//                                 Үйлчилгээ
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/law" className="hover:text-lime-400 transition" style={{ fontFamily: 'RobotoBold' }}>
//                                 Хууль, эрх зүй
//                             </Link>
//                         </li>
//                         <li>
//                             <Link href="/privacy" className="hover:text-lime-400 transition" style={{ fontFamily: 'RobotoBold' }}>
//                                 Нууцлалын бодлого
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </section>


//             {/* --- Доод хэсэг: Зохиогчийн эрх ба соц холбоос --- */}
//             <div className="border-t border-green-700 pt-6 pb-6 px-6 justify-center">
//                 <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto">



//                     {/* Хуулийн хэсэг */}
//                     <div className="text-center md:text-center text-sm text-green-200">
//                         <p style={{ fontFamily: 'RobotoBold' }}>
//                             © 2025{" "}
//                             <span className="text-lime-400 font-semibold" >AgroCity</span>. Бүх
//                             эрх хуулиар хамгаалагдсан.
//                         </p>
//                         <p className="text-green-300 mt-1" style={{ fontFamily: 'RobotoBold' }}>
//                             Website designed by{" "}
//                             <span className="text-lime-300 font-semibold hover:underline">
//                                 Amber LLC
//                             </span>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;
