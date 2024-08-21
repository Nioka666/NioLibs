// seeders or data lake
export const AdminSeed = [
  {
    username: "Nioka666",
    email: "nioka@gmail.com",
    password: "11111111",
    nama_lengkap: "Adhim Niokagi",
    alamat: "Dsn Wonoayu, Jetis",
    level: "Admin",
    tanggal_bergabung: new Date(),
  },
  {
    username: "Adhim666",
    email: "adhim@gmail.com",
    password: "11111111",
    nama_lengkap: "Adhim Niokagi",
    alamat: "Dsn Wonoayu, Jetis",
    level: "Petugas",
    tanggal_bergabung: new Date(),
  },
];

export const UserSeed = [
  {
    username: "nioka666",
    email: "niokagi@gmail.com",
    password: "22222222",
    nama_lengkap: "Adhim Niokagi",
    alamat: "Dsn Wonoayu, Jetis",
    tanggal_bergabung: new Date(),
  },
  {
    username: "alpha",
    email: "alpha@gmail.com",
    password: "11111111",
    nama_lengkap: "Alpha User",
    alamat: "Unknown",
    tanggal_bergabung: new Date(),
  },
];

export const BookSeed = [
  {
    judul: "Treasury",
    stok: 66,
    penulis: "Beatrix Potter",
    penerbit: "London News",
    cover: "treasury.jpg",
    deskripsi:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae iste quibusdam quas nihil molestias ducimus excepturi, libero laboriosam nam natus tempore praesentium repellat obcaecati dolorem autem aliquid earum cumque ad!",
    tahun_terbit: 1996,
  },
  {
    judul: "Eloquent Javascript",
    stok: 99,
    penulis: "Vladimir Lenin",
    penerbit: "London News",
    cover: "eloquent_javascript.jpg",
    deskripsi:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae iste quibusdam quas nihil molestias ducimus excepturi, libero laboriosam nam ",
    tahun_terbit: 1956,
  },
];

export const CategorySeed = [
  {
    nama_kategori: "History",
  },
  {
    nama_kategori: "History",
  },
  {
    nama_kategori: "History",
  },
  {
    nama_kategori: "History",
  },
];

export const CategoryRelationSeed = [
  {
    buku_id: "ObjectID",
    kategori_id: "ObjectID",
  },
];
