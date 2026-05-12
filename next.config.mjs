// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 hostname: "cdn.myanimelist.net"
//             },
//             {
//                 hostname: "avatars.githubusercontent.com"
//             }
//         ]
//     }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'myanimelist.net',
            },
            {
                protocol: 'https',
                hostname: '*.myanimelist.net', // Mengizinkan semua subdomain seperti cdn.
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            }
        ]
    }
};

export default nextConfig;