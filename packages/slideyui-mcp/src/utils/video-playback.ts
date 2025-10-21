/**
 * Smart video playback utilities
 *
 * Client-side script for controlling video playback based on visibility
 * and user-defined configuration.
 *
 * Usage: Include this script in your presentation HTML to enable
 * smart video playback controls.
 */

/**
 * Video playback manager class
 */
export class VideoPlaybackManager {
  private videos: Map<HTMLVideoElement, IntersectionObserver> = new Map();

  constructor() {
    this.init();
  }

  /**
   * Initialize video playback management
   */
  init(): void {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupVideos());
    } else {
      this.setupVideos();
    }
  }

  /**
   * Setup all videos in the document
   */
  private setupVideos(): void {
    const videos = document.querySelectorAll<HTMLVideoElement>('video[data-play-on]');
    videos.forEach((video) => this.setupVideo(video));
  }

  /**
   * Setup individual video element
   */
  private setupVideo(video: HTMLVideoElement): void {
    const playOn = video.dataset.playOn || 'visible';
    const pauseOn = video.dataset.pauseOn || 'hidden';
    const playbackRate = video.dataset.playbackRate;
    const fallbackImage = video.dataset.fallbackImage;

    // Set playback rate if specified
    if (playbackRate) {
      video.playbackRate = parseFloat(playbackRate);
    }

    // Handle fallback image on error
    if (fallbackImage) {
      video.addEventListener('error', () => {
        this.handleVideoError(video, fallbackImage);
      });
    }

    // Setup playback control based on configuration
    switch (playOn) {
      case 'visible':
        this.setupVisibilityControl(video, pauseOn);
        break;
      case 'immediate':
        this.playVideo(video);
        if (pauseOn === 'hidden') {
          this.setupVisibilityControl(video, pauseOn);
        }
        break;
      case 'manual':
        // No automatic playback
        break;
    }

    // Mark as loaded
    const container = video.closest('.slideyui-hero-video');
    if (container) {
      video.addEventListener('loadeddata', () => {
        container.setAttribute('data-video-state', 'loaded');
      });
      video.addEventListener('error', () => {
        container.setAttribute('data-video-state', 'error');
      });
    }
  }

  /**
   * Setup visibility-based playback control
   */
  private setupVisibilityControl(video: HTMLVideoElement, pauseOn: string): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is visible
            this.playVideo(video);
          } else if (pauseOn === 'hidden') {
            // Video is hidden and should pause
            this.pauseVideo(video);
          }
        });
      },
      {
        threshold: 0.5, // Play when 50% visible
      }
    );

    observer.observe(video);
    this.videos.set(video, observer);
  }

  /**
   * Play video with error handling
   */
  private playVideo(video: HTMLVideoElement): void {
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn('Video autoplay failed:', error);
        // Autoplay was prevented, possibly need user interaction
        // Could show play button overlay here
      });
    }
  }

  /**
   * Pause video
   */
  private pauseVideo(video: HTMLVideoElement): void {
    if (!video.paused) {
      video.pause();
    }
  }

  /**
   * Handle video loading error
   */
  private handleVideoError(video: HTMLVideoElement, fallbackImage: string): void {
    // Replace video with fallback image
    const container = video.parentElement;
    if (container) {
      const fallback = document.createElement('div');
      fallback.className = 'slideyui-video-fallback';
      fallback.style.backgroundImage = `url('${fallbackImage}')`;
      container.appendChild(fallback);
      video.style.display = 'none';
    }
  }

  /**
   * Cleanup observers
   */
  destroy(): void {
    this.videos.forEach((observer, video) => {
      observer.disconnect();
    });
    this.videos.clear();
  }
}

/**
 * Global initialization
 * Auto-initialize when script is loaded
 */
if (typeof window !== 'undefined') {
  // Create global instance
  let videoManager: VideoPlaybackManager | null = null;

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      videoManager = new VideoPlaybackManager();
    });
  } else {
    videoManager = new VideoPlaybackManager();
  }

  // Expose to window for manual control
  (window as any).SlideyUIVideoManager = VideoPlaybackManager;

  // Cleanup on unload
  window.addEventListener('beforeunload', () => {
    if (videoManager) {
      videoManager.destroy();
    }
  });
}

/**
 * Export for module usage
 */
export default VideoPlaybackManager;
