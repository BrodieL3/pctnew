"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, Download, Info, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";

// Default neutral position
const defaultUserPosition = {
  economic: 0, // -100 to 100, neutral is 0
  social: 0, // -100 to 100, neutral is 0
  economicScore: 50, // Percentage representation (0-100), neutral is 50
  socialScore: 50, // Percentage representation (0-100), neutral is 50
};

// Famous political figures for comparison
const politicalFigures = [
  { name: "Bernie Sanders", economic: -70, social: -30, color: "#3182CE" },
  { name: "Joe Biden", economic: -10, social: 10, color: "#3182CE" },
  { name: "Donald Trump", economic: 60, social: 50, color: "#E53E3E" },
  { name: "Ron DeSantis", economic: 75, social: 65, color: "#E53E3E" },
  { name: "Noam Chomsky", economic: -85, social: -80, color: "#805AD5" },
  { name: "Milton Friedman", economic: 90, social: -40, color: "#DD6B20" },
];

export function PoliticalCompassResults() {
  const [showFigures, setShowFigures] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [userPosition, setUserPosition] = useState(defaultUserPosition);
  const [isNeutralResult, setIsNeutralResult] = useState(false);

  // Load results from localStorage when component mounts
  useEffect(() => {
    const loadResults = () => {
      try {
        const savedResults = localStorage.getItem("politicalCompassResults");
        if (savedResults) {
          const parsedResults = JSON.parse(savedResults);
          setUserPosition(parsedResults);

          // Check if this is a neutral result (all responses are 50)
          const responses = parsedResults.responses || {};
          const allNeutral = Object.values(responses).every(
            (val) => val === 50
          );
          setIsNeutralResult(allNeutral);
        } else {
          // If no results found, use default neutral position
          setUserPosition(defaultUserPosition);
          setIsNeutralResult(true);
        }
      } catch (error) {
        console.error("Error loading results:", error);
        setUserPosition(defaultUserPosition);
        setIsNeutralResult(true);
      }
    };

    loadResults();
  }, []);

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(zoomLevel + 0.25);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.25);
  };

  // const handleShare = () => {
  // In a real app, implement sharing functionality
  //   alert("Share functionality would be implemented here")
  // }

  const handleDownload = () => {
    // In a real app, implement download/print functionality
    alert("Download functionality would be implemented here");
  };

  // Determine quadrant and ideology
  const getQuadrant = (economic: number, social: number) => {
    if (economic >= 0 && social >= 0) return "Authoritarian Right";
    if (economic >= 0 && social < 0) return "Libertarian Right";
    if (economic < 0 && social >= 0) return "Authoritarian Left";
    return "Libertarian Left";
  };

  const getIdeology = (economic: number, social: number) => {
    const absEconomic = Math.abs(economic);
    const absSocial = Math.abs(social);

    // Special case for true neutral
    if (economic === 0 && social === 0) return "True Neutral";

    // Extreme positions
    if (absEconomic > 70 && absSocial > 70) {
      if (economic < 0 && social < 0) return "Anarcho-Communism";
      if (economic < 0 && social > 0) return "Authoritarian Communism";
      if (economic > 0 && social < 0) return "Anarcho-Capitalism";
      return "Fascism";
    }

    // Strong positions
    if (absEconomic > 50 || absSocial > 50) {
      if (economic < -50 && social < 0) return "Libertarian Socialism";
      if (economic < -50 && social > 0) return "State Socialism";
      if (economic > 50 && social < 0) return "Right Libertarianism";
      if (economic > 50 && social > 0) return "Conservative";
      if (economic < 0 && social > 50) return "Left Authoritarianism";
      if (economic > 0 && social > 50) return "Right Authoritarianism";
      if (absEconomic < 20 && social < -50) return "Social Libertarianism";
      if (absEconomic < 20 && social > 50) return "Social Authoritarianism";
    }

    // Moderate positions
    if (absEconomic < 20 && absSocial < 20) {
      return "Centrist";
    }

    // Leaning positions
    if (economic < 0 && social < 0) return "Left Libertarian";
    if (economic < 0 && social > 0) return "Left Authoritarian";
    if (economic > 0 && social < 0) return "Right Libertarian";
    return "Right Authoritarian";
  };

  const userQuadrant = getQuadrant(userPosition.economic, userPosition.social);
  const userIdeology = getIdeology(userPosition.economic, userPosition.social);

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Header with controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Your Political Compass Results</h1>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFigures(!showFigures)}
                >
                  {showFigures ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Share2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {showFigures
                  ? "Hide political figures"
                  : "Compare with political figures"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download results</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>About the Political Compass</DialogTitle>
                <DialogDescription>
                  The Political Compass is a two-dimensional model that plots
                  political ideologies along two axes:
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="font-medium">Economic Axis (Left-Right)</h3>
                  <p className="text-sm text-muted-foreground">
                    Measures economic positions from left (favoring economic
                    equality and government intervention) to right (favoring
                    free markets and economic freedom).
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">
                    Social Axis (Authoritarian-Libertarian)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Measures social positions from authoritarian (favoring
                    social order and tradition) to libertarian (favoring
                    individual liberty and social freedom).
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Quadrants</h3>
                  <ul className="text-sm text-muted-foreground space-y-2 mt-2">
                    <li>
                      <span className="font-medium">Authoritarian Left:</span>{" "}
                      Combines left-wing economics with socially authoritarian
                      views
                    </li>
                    <li>
                      <span className="font-medium">Authoritarian Right:</span>{" "}
                      Combines right-wing economics with socially authoritarian
                      views
                    </li>
                    <li>
                      <span className="font-medium">Libertarian Left:</span>{" "}
                      Combines left-wing economics with socially libertarian
                      views
                    </li>
                    <li>
                      <span className="font-medium">Libertarian Right:</span>{" "}
                      Combines right-wing economics with socially libertarian
                      views
                    </li>
                  </ul>
                </div>
              </div>
              <DialogClose asChild>
                <Button type="button">Close</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Zoom in</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Zoom out</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Results panel */}
      <div className="absolute bottom-4 left-4 z-10 bg-background/80 backdrop-blur-sm p-4 rounded-lg border max-w-xs">
        <div className="space-y-4">
          {isNeutralResult && (
            <div className="bg-blue-50 text-blue-800 p-3 rounded-md mb-4">
              <p className="text-sm font-medium">
                This is a True Neutral result, representing a perfectly balanced
                position on all issues.
              </p>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold">Your Position</h2>
            <p className="text-sm text-muted-foreground">
              Economic: {userPosition.economic.toFixed(1)} | Social:{" "}
              {userPosition.social.toFixed(1)}
            </p>
          </div>

          <div>
            <h3 className="font-medium">Quadrant</h3>
            <p className="text-primary font-semibold">{userQuadrant}</p>
          </div>

          <div>
            <h3 className="font-medium">Closest Ideology</h3>
            <p className="text-primary font-semibold">{userIdeology}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted p-2 rounded-md text-center">
              <div className="text-sm text-muted-foreground">Economic</div>
              <div className="text-lg font-bold">
                {userPosition.economicScore.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">
                {userPosition.economic < 0
                  ? "Left"
                  : userPosition.economic > 0
                  ? "Right"
                  : "Center"}
              </div>
            </div>
            <div className="bg-muted p-2 rounded-md text-center">
              <div className="text-sm text-muted-foreground">Social</div>
              <div className="text-lg font-bold">
                {userPosition.socialScore.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">
                {userPosition.social < 0
                  ? "Libertarian"
                  : userPosition.social > 0
                  ? "Authoritarian"
                  : "Center"}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Home
              </Button>
            </Link>
            <Link href="/surveys/political-compass" className="flex-1">
              <Button className="w-full">Retake</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Political Compass */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="relative"
          style={{
            width: `${100 * zoomLevel}%`,
            height: `${100 * zoomLevel}%`,
            maxWidth: "1200px",
            maxHeight: "1200px",
            transition: "width 0.3s, height 0.3s",
          }}
        >
          {/* Quadrant backgrounds */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-100/30"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100/30"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-green-100/30"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-100/30"></div>

          {/* Quadrant labels */}
          <div className="absolute top-4 left-4 text-sm font-medium text-red-600/70">
            Authoritarian Left
          </div>
          <div className="absolute top-4 right-4 text-sm font-medium text-blue-600/70">
            Authoritarian Right
          </div>
          <div className="absolute bottom-4 left-4 text-sm font-medium text-green-600/70">
            Libertarian Left
          </div>
          <div className="absolute bottom-4 right-4 text-sm font-medium text-yellow-600/70">
            Libertarian Right
          </div>

          {/* Axes */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-foreground"></div>
          <div className="absolute left-0 right-0 top-1/2 h-px bg-foreground"></div>

          {/* Grid lines */}
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-foreground/20"></div>
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-foreground/20"></div>
          <div className="absolute left-0 right-0 top-1/4 h-px bg-foreground/20"></div>
          <div className="absolute left-0 right-0 top-3/4 h-px bg-foreground/20"></div>

          {/* Axis labels */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-medium">
            Authoritarian
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-medium">
            Libertarian
          </div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-medium rotate-90 origin-left">
            Economic Left
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium -rotate-90 origin-right">
            Economic Right
          </div>

          {/* Political figures */}
          {showFigures &&
            politicalFigures.map((figure, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: figure.color,
                        left: `${50 + figure.economic / 2}%`,
                        top: `${50 - figure.social / 2}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>{figure.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}

          {/* User position */}
          <motion.div
            className="absolute w-6 h-6 bg-primary rounded-full z-10"
            style={{
              left: `${50 + userPosition.economic / 2}%`,
              top: `${50 - userPosition.social / 2}%`,
            }}
            initial={{ scale: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, x: "-50%", y: "-50%" }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <motion.div
              className="absolute w-12 h-12 bg-primary/30 rounded-full"
              style={{ top: "-50%", left: "-50%" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
