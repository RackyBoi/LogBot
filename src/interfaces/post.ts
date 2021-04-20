export declare module e621 {

  export interface File {
      width: number;
      height: number;
      ext: string;
      size: number;
      md5: string;
      url: string;
  }

  export interface Preview {
      width: number;
      height: number;
      url: string;
  }

  // export interface 480p2 {
  //     type: string;
  //     height: number;
  //     width: number;
  //     urls: string[];
  // }

  export interface Original {
      type: string;
      height: number;
      width: number;
      urls: string[];
  }

  // export interface 720p2 {
  //     type: string;
  //     height: number;
  //     width: number;
  //     urls: string[];
  // }

  // export interface Alternates {
  //     480p: 480p2;
  //     original: Original;
  //     720p: 720p2;
  // }

  export interface Sample {
      has: boolean;
      height: number;
      width: number;
      url: string;
      // alternates: Alternates;
  }

  export interface Score {
      up: number;
      down: number;
      total: number;
  }

  export interface Tags {
      general: string[];
      species: string[];
      character: string[];
      copyright: string[];
      artist: string[];
      invalid: string[];
      lore: string[];
      meta: string[];
  }

  export interface Flags {
      pending: boolean;
      flagged: boolean;
      note_locked: boolean;
      status_locked: boolean;
      rating_locked: boolean;
      deleted: boolean;
  }

  export interface Relationships {
      parent_id?: number;
      has_children: boolean;
      has_active_children: boolean;
      children: number[];
  }

  export interface Post {
      id: number;
      created_at: Date;
      updated_at: Date;
      file: File;
      preview: Preview;
      sample: Sample;
      score: Score;
      tags: Tags;
      locked_tags: any[];
      change_seq: number;
      flags: Flags;
      rating: 's' | 'q' | 'e';
      fav_count: number;
      sources: string[];
      pools: number[];
      relationships: Relationships;
      approver_id?: number;
      uploader_id: number;
      description: string;
      comment_count: number;
      is_favorited: boolean;
      has_notes: boolean;
      duration?: number;
  }

  export interface RootObject {
      posts: Post[];
  }

}

