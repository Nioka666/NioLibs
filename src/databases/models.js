// 21 february 2024
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;

export const AdminSchema = new Schema({
  admin_id: ObjectID,
  nama_lengkap: String,
  username: {
    type: String,
    unique: true,
  },
  email: String,
  password: String,
  alamat: String,
  level: {
    type: String,
    enum: ["Admin", "Petugas"],
    required: true,
  },
  tanggal_bergabung: Date,
});

export const UserSchema = new Schema({
  user_id: ObjectID,
  nama_lengkap: String,
  username: {
    type: String,
    unique: true,
  },
  email: String,
  password: String,
  alamat: String,
  tanggal_bergabung: Date,
});

export const BukuSchema = new Schema({
  buku_id: ObjectID,
  judul: String,
  cover: String,
  penulis: String,
  stok: Number,
  penerbit: String,
  deskripsi: String,
  tahun_terbit: Number,
});

export const KategoriBukuSchema = new Schema({
  kategori_id: ObjectID,
  nama_kategori: String,
});

// dummy table
export const KategoriBukuRelasiSchema = new Schema({
  kategori_relasi_id: ObjectID,
  buku_id: {
    type: ObjectID,
    ref: "bukus",
  },
  kategori_id: {
    type: ObjectID,
    ref: "kategori_bukus",
  },
});

export const PeminjamanSchema = new Schema({
  peminjaman_id: ObjectID,
  user_id: {
    type: ObjectID,
    ref: "users",
  },
  buku_id: {
    type: ObjectID,
    ref: "bukus",
  },
  username: String,
  lama_pinjam: {
    type: Number,
    required: true,
  },
  tanggal_pinjam: Date,
  tanggal_kembali: Date,
  status_pinjam: {
    type: String,
    enum: ["proses", "dipinjam", "dikembalikan"],
  },
  enum: ["Dipinjam", "Dikembalikan", "Dihilangkan"],
});

export const KoleksiPribadiSchema = new Schema({
  koleksi_id: ObjectID,
  user_id: {
    type: ObjectID,
    ref: "users",
    required: true,
  },
  buku_id: {
    type: ObjectID,
    ref: "bukus",
  },
  judul: String,
  penulis: String,
  cover: String,
  tanggal_dibuat: Date,
});

export const UlasanBukuSchema = new Schema({
  ulasan_id: ObjectID,
  user_id: {
    type: ObjectID,
    ref: "users",
  },
  buku_id: {
    type: ObjectID,
    ref: "bukus",
  },
  ulasan: String,
  rating: Number,
});

// export const DendaSchema = new Schema({
//   denda_id: ObjectID,
//   denda: Number,
// });

// define models
export const AdminModel = mongoose.model("admins", AdminSchema);
export const UserModel = mongoose.model("users", UserSchema);
export const BukuModel = mongoose.model("bukus", BukuSchema);
export const KategoriBukuModel = mongoose.model(
  "kategori_bukus",
  KategoriBukuSchema
);
export const KategoriBukuRelasiModel = mongoose.model(
  "kategori_buku_relasis",
  KategoriBukuRelasiSchema
);
export const PeminjamanModel = mongoose.model("peminjamans", PeminjamanSchema);
export const KoleksiPribadiModel = mongoose.model(
  "koleksi_bukus",
  KoleksiPribadiSchema
);
export const UlasanBukuModel = mongoose.model("ulasan_bukus", UlasanBukuSchema);
// export const DendaModel = mongoose.model("dendas", DendaSchema);
