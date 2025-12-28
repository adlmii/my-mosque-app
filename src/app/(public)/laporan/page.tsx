import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Laporan Keuangan",
  description: "Transparansi laporan keuangan infaq dan shodaqoh masjid.",
};

// Data Dummy Sederhana (Nanti bisa dipindah ke data-laporan.ts)
const DATA_KEUANGAN = [
  { bulan: "November 2024", masuk: "Rp 15.400.000", keluar: "Rp 12.100.000", saldo: "Rp 3.300.000" },
  { bulan: "Oktober 2024", masuk: "Rp 14.200.000", keluar: "Rp 13.500.000", saldo: "Rp 700.000" },
  { bulan: "September 2024", masuk: "Rp 16.800.000", keluar: "Rp 10.200.000", saldo: "Rp 6.600.000" },
];

export default function LaporanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/10 via-white to-accent/20 font-optimized pb-20 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <section className="bg-gradient-to-br from-white via-accent/5 to-secondary/10 border-b border-border/60 py-16 md:py-20 relative">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 bg-white/80 backdrop-blur-sm text-primary">
            Transparansi Umat
          </Badge>
          <h1 className="mb-4 text-4xl font-bold font-serif text-foreground">Laporan Keuangan</h1>
          <p className="text-muted-foreground text-lg">
            Sebagai bentuk pertanggungjawaban, kami mempublikasikan laporan arus kas rutin setiap bulannya.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <Card className="border-border shadow-lg bg-white/95 backdrop-blur-sm overflow-hidden max-w-4xl mx-auto">
          <CardContent className="p-0">
             <Table>
               <TableHeader>
                 <TableRow className="bg-gradient-to-r from-secondary/30 to-accent/20 hover:from-secondary/30 hover:to-accent/20">
                   <TableHead className="py-4 pl-6 font-bold text-foreground">Periode</TableHead>
                   <TableHead className="py-4 text-green-600 font-bold">Pemasukan</TableHead>
                   <TableHead className="py-4 text-red-500 font-bold">Pengeluaran</TableHead>
                   <TableHead className="py-4 text-primary font-bold">Saldo Akhir</TableHead>
                   <TableHead className="py-4 pr-6 text-right">Aksi</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {DATA_KEUANGAN.map((item, i) => (
                   <TableRow key={i} className="hover:bg-secondary/10 font-sans transition-colors">
                     <TableCell className="pl-6 py-4 font-medium">{item.bulan}</TableCell>
                     <TableCell className="py-4 text-green-700">{item.masuk}</TableCell>
                     <TableCell className="py-4 text-red-600">{item.keluar}</TableCell>
                     <TableCell className="py-4 font-bold text-foreground">{item.saldo}</TableCell>
                     <TableCell className="pr-6 py-4 text-right">
                       <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
                         <Download className="w-4 h-4" />
                       </Button>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
          </CardContent>
          <div className="p-6 bg-gradient-to-r from-secondary/20 to-accent/10 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Laporan lengkap tersedia di papan pengumuman masjid.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}