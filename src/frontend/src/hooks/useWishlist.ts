import { useEffect, useState } from "react";

export function useWishlist(userId: string | null) {
  const storageKey = userId ? `welkee_wishlist_${userId}` : null;

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (!storageKey) return [];
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!storageKey) {
      setWishlist([]);
      return;
    }
    try {
      setWishlist(JSON.parse(localStorage.getItem(storageKey) || "[]"));
    } catch {
      setWishlist([]);
    }
  }, [storageKey]);

  const toggleWishlist = (bikeName: string) => {
    if (!storageKey) return undefined;
    const wasWishlisted = wishlist.includes(bikeName);
    const updated = wasWishlisted
      ? wishlist.filter((n) => n !== bikeName)
      : [...wishlist, bikeName];
    setWishlist(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    return wasWishlisted ? "removed" : "added";
  };

  const isWishlisted = (bikeName: string) => wishlist.includes(bikeName);

  return { wishlist, toggleWishlist, isWishlisted, count: wishlist.length };
}
