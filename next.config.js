/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["upload.wikimedia.org","images.pexels.com","i.natgeofe.com","i.pinimg.com","assets3.thrillist.com","i.pinimg.com","www.peta.org","30a.com","wildaid.org","c.files.bbci.co.uk","cdn.pixabay.com","cdn.mos.cms.futurecdn.net","news.okstate.edu","imgk.timesnownews.com","imgs.mongabay.com","images.theconversation.com","imgk.timesnownews.com","imagesvc.meredithcorp.io","cdn.pixabay.com","images.immediate.co.uk","img.freepik.com","encrypted-tbn0.gstatic.com","images.unsplash.com","image.shutterstock.com"],
    formats: ["image/webp"],
},
}

module.exports = nextConfig
