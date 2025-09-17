import { ViewStyle, TextStyle } from 'react-native';

// Tailwind-like utility functions
export const tw = {
  // Flexbox
  'flex-1': { flex: 1 },
  'flex-row': { flexDirection: 'row' as const },
  'flex-col': { flexDirection: 'column' as const },
  'justify-center': { justifyContent: 'center' as const },
  'items-center': { alignItems: 'center' as const },
  'justify-between': { justifyContent: 'space-between' as const },
  
  // Positioning
  'absolute': { position: 'absolute' as const },
  'relative': { position: 'relative' as const },
  
  // Spacing
  'p-4': { padding: 16 },
  'p-2': { padding: 8 },
  'm-4': { margin: 16 },
  'm-2': { margin: 8 },
  'mt-4': { marginTop: 16 },
  'mb-4': { marginBottom: 16 },
  'px-4': { paddingHorizontal: 16 },
  'py-2': { paddingVertical: 8 },
  
  // Sizing
  'w-full': { width: '100%' },
  'h-full': { height: '100%' },
  'w-screen': { width: '100%' },
  'h-screen': { height: '100%' },
  
  // Colors
  'bg-white': { backgroundColor: '#ffffff' },
  'bg-black': { backgroundColor: '#000000' },
  'bg-gray-100': { backgroundColor: '#f5f5f5' },
  'bg-blue-500': { backgroundColor: '#3b82f6' },
  
  // Text
  'text-center': { textAlign: 'center' as const },
  'text-white': { color: '#ffffff' },
  'text-black': { color: '#000000' },
  'font-bold': { fontWeight: 'bold' as const },
  
  // Borders
  'rounded': { borderRadius: 4 },
  'rounded-lg': { borderRadius: 8 },
  'border': { borderWidth: 1 },
  
  // Layout
  'bottom-0': { bottom: 0 },
  'top-0': { top: 0 },
  'left-0': { left: 0 },
  'right-0': { right: 0 },
};

// Helper function to combine styles
export const combine = (...styles: (keyof typeof tw | ViewStyle | TextStyle)[]): ViewStyle => {
  return styles.reduce((acc, style) => {
    if (typeof style === 'string' && style in tw) {
      return { ...acc, ...tw[style as keyof typeof tw] };
    } else if (typeof style === 'object' && style !== null) {
      return { ...acc, ...style };
    }
    return acc;
  }, {} as ViewStyle);
};

export default tw;
