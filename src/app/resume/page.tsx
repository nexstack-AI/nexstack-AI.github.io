"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Back button */}
      <div className="container mx-auto px-4 pt-6 pb-2 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-orange-500 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              返回首页
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Download bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="container mx-auto px-4 py-3 max-w-5xl flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">
            我的简历
          </span>
          <a href="/resume.pdf" download>
            <Button variant="outline" className="gap-2 border-orange-500/30 text-orange-500 hover:bg-orange-500/10">
              <Download className="w-4 h-4" />
              下载 PDF
            </Button>
          </a>
        </div>
      </motion.div>

      {/* PDF embed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto px-4 pb-16 max-w-5xl"
      >
        <embed
          src="/resume.pdf"
          type="application/pdf"
          className="w-full rounded-xl border border-border/50"
          style={{ height: "calc(100vh - 120px)", minHeight: "600px" }}
        />
      </motion.div>
    </div>
  );
}