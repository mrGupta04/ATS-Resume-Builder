"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AIFeaturesSection } from './Aifeaturesection'
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Wand2,
  FileCheck,
  Palette,
  Download,
  Shield,
  Globe,
  ChevronLeft,
  ChevronRight,
  Target,
  Zap,
  Eye,
  FileText,
  LayoutTemplate,
  MousePointerClick,
  Image as ImageIcon,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
} from "lucide-react";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import type { FC } from "react";
import Image from "next/image";
import CountUp from "react-countup";

interface ResumeCount {
  count: number;
}

async function getResumesCreated(): Promise<number> {
  try {
    const infoDoc = await getDoc(doc(db, "info", "resumesCreated"));
    return infoDoc.exists() ? (infoDoc.data() as ResumeCount).count : 0;
  } catch (error) {
    console.error("Error fetching resumes count:", error);
    return 0;
  }
}

const FeatureCard: FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}> = ({ icon, title, description, features }) => (
  <Card className="transition-all duration-300 hover:shadow-lg h-full flex flex-col group border-0 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <CardHeader className="pb-3">
      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 text-white">
        {icon}
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription className="mt-2">{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm md:text-base">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

// Template Preview Modal Component with Zoom
const TemplatePreviewModal: FC<{
  template: string;
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}> = ({ template, isOpen, onClose, imageUrl }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      // Zoom in
      setScale(prev => Math.min(prev + 0.1, 3));
    } else {
      // Zoom out
      setScale(prev => Math.max(prev - 0.1, 0.5));
    }
  };

  // Reset zoom when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetZoom();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b bg-gray-50 dark:bg-gray-800">
          <DialogTitle className="text-2xl flex items-center gap-2">
            <LayoutTemplate className="h-6 w-6" />
            Preview: {template} Template
          </DialogTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-4">
              <Button
                variant="outline"
                size="icon"
                onClick={zoomOut}
                disabled={scale <= 0.5}
                className="h-8 w-8"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[40px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={zoomIn}
                disabled={scale >= 3}
                className="h-8 w-8"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={resetZoom}
                className="h-8 w-8 ml-2"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div 
          className="flex-1 relative overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-8"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ cursor: isDragging ? 'grabbing' : scale > 1 ? 'grab' : 'default' }}
        >
          <div
            ref={imageRef}
            className="relative transition-transform duration-200"
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transformOrigin: 'center center'
            }}
          >
            <Image
              src={imageUrl}
              alt={template}
              width={800}
              height={1000}
              className="object-contain max-w-full max-h-[70vh] shadow-lg rounded-lg"
              quality={100}
            />
          </div>
          
          {scale > 1 && (
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <Move className="h-4 w-4" />
              Drag to navigate
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50 dark:bg-gray-800">
          <p className="text-sm text-muted-foreground">
            This template is optimized for ATS systems and designed to help you stand out.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close Preview
            </Button>
            <Link href="/resume/create" onClick={onClose}>
              <Button>
                Use This Template
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Template Card Component with Image Fallback
const TemplateCard: FC<{ template: string; index: number; onPreview: (template: string, imageUrl: string) => void }> = ({ 
  template, 
  index, 
  onPreview 
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Sample template images (replace with your actual image paths)
  const templateImages = [
    "/assets/Minimal.png",
    "/assets/Modern.png",
     "/assets/Professional.png",
     "/assets/my.png",
    "/assets/Minimal.png",
  ];

  const imageUrl = templateImages[index] || `/api/placeholder/300/400?text=${template}`;

  return (
    <>
      <Card className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] flex-shrink-0 transition-all duration-300 hover:scale-[1.02] group border-0 shadow-md hover:shadow-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-[3/4] rounded-t-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center relative overflow-hidden">
            {!imageError ? (
              <Image
                src={imageUrl}
                alt={template}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
                priority={index === 0}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4">
                <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm">Template preview</p>
                <p className="font-medium text-gray-700 dark:text-gray-300">{template}</p>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <Button 
                className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                onClick={() => onPreview(template, imageUrl)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
          <div className="p-4 text-center">
            <p className="font-semibold text-lg">{template}</p>
            <p className="text-sm text-muted-foreground mt-1">ATS Optimized</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const TemplateTabs: FC<{ templates: string[]; onPreview: (template: string, imageUrl: string) => void }> = ({ 
  templates, 
  onPreview 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      // Initial check
      checkScrollPosition();
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto flex items-center px-4 md:px-8">
      {/* Left Arrow - Conditionally rendered and positioned */}
      {showLeftArrow && (
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollLeft}
          className="hidden md:flex absolute left-2 z-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-primary/20 w-12 h-12 border"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-4"
        onScroll={checkScrollPosition}
      >
        {templates.map((template, index) => (
          <TemplateCard 
            key={index} 
            template={template} 
            index={index} 
            onPreview={onPreview}
          />
        ))}
      </div>

      {/* Right Arrow - Conditionally rendered and positioned */}
      {showRightArrow && (
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollRight}
          className="hidden md:flex absolute right-2 z-10 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-primary/20 w-12 h-12 border"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}

      {/* Mobile indicators */}
      <div className="md:hidden flex justify-center w-full mt-4 space-x-2">
        {templates.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-muted-foreground/30"
          />
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  const templatesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [resumesCreated, setResumesCreated] = useState(0);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const templates = ["Modern", "Professional", "Minimal", "Elegant", "Creative"];

  const features = [
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: "AI-Powered Content",
      description: "Smart suggestions to enhance your resume",
      features: [
        "Intelligent content suggestions",
        "Keyword optimization",
        "Industry-specific phrasing",
      ],
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "ATS Optimized",
      description: "Designed to pass applicant tracking systems",
      features: [
        "ATS-friendly templates",
        "Proper formatting",
        "Keyword optimization",
      ],
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Easy Customization",
      description: "Tailor your resume to your style",
      features: [
        "Change colors and fonts",
        "Multiple layout options",
        "Real-time preview",
      ],
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Multiple Formats",
      description: "Export your resume in various formats",
      features: ["PDF download", "Word document export", "Plain text version"],
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "No Watermarks",
      description: "Completely free without limitations",
      features: ["Completely free", "No branding", "No hidden fees"],
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Cloud Storage",
      description: "Access your resumes from anywhere",
      features: [
        "Save your resumes",
        "Access from anywhere",
        "Multiple versions",
      ],
    },
  ];

  useEffect(() => {
    const fetchResumesCount = async () => {
      const count = await getResumesCreated();
      setResumesCreated(count);
    };
    fetchResumesCount();
  }, []);

  const scrollToTemplates = () => {
    templatesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePreviewTemplate = (template: string, imageUrl: string) => {
    setSelectedTemplate(template);
    setSelectedImageUrl(imageUrl);
    setPreviewModalOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewModalOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      {/* Template Preview Modal */}
      <TemplatePreviewModal
        template={selectedTemplate}
        isOpen={previewModalOpen}
        onClose={handleClosePreview}
        imageUrl={selectedImageUrl}
      />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 md:py-28 text-center relative bg-gradient-to-br from-slate-50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative space-y-6 mb-10 max-w-4xl">
          <Badge className="mb-4 px-4 py-2 text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:bg-blue-500/15">
            <Sparkles className="h-4 w-4 mr-1.5" />
            100% Free & Open Source
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Create Your Perfect{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[750px] mx-auto leading-relaxed">
            Free, open-source resume builder powered by AI. No watermarks, no
            hidden fees. Land your dream job with a professional resume.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-16 z-10">
          <Link
            href="/resume/create"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={scrollToTemplates}
            className="rounded-xl py-4 px-6 border-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <LayoutTemplate className="h-5 w-5 mr-2" />
            View Templates
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto w-full">
          {[
            { value: resumesCreated, label: "Resumes Created", suffix: "+", icon: <FileText className="h-5 w-5" /> },
            { value: 100, label: "Free Forever", suffix: "%", icon: <Zap className="h-5 w-5" /> },
            { value: 98, label: "ATS Success", suffix: "%", icon: <Target className="h-5 w-5" /> },
            { value: "Unlimited", label: "Templates", suffix: "", icon: <LayoutTemplate className="h-5 w-5" /> },
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-blue-600 mb-2 flex justify-center">
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {typeof stat.value === "number" ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    enableScrollSpy={true}
                  />
                ) : (
                  stat.value
                )}
                {stat.suffix}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-20 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
      >
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
            >
              <MousePointerClick className="h-3.5 w-3.5 mr-1.5" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Stand Out
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Our powerful features help you create a resume that gets noticed
              by employers and ATS systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                features={feature.features}
              />
            ))}
          </div>
        </div>
      </section>

      <AIFeaturesSection />

      {/* Templates Preview */}
      <section
        ref={templatesRef}
        className="py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900 w-full"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 px-4">
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-sm bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
            >
              <LayoutTemplate className="h-3.5 w-3.5 mr-1.5" />
              Templates
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Professional{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Templates
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose from our collection of ATS-optimized templates designed to help
              you stand out from the competition.
            </p>
          </div>

          <TemplateTabs templates={templates} onPreview={handlePreviewTemplate} />

          <div className="text-center mt-12">
            <Button 
              onClick={scrollToFeatures}
              variant="outline"
              className="rounded-xl"
            >
              Explore All Features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container px-4 mx-auto text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your Resume?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join <span className="font-semibold text-blue-600">{resumesCreated}+</span> users who have landed their dream jobs with our resume builder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/resume/create"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
              >
                Create Your Resume Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}