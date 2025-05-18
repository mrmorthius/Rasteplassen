import React from "react";

export default function Comments({
  posts,
  showComments,
  isAuthenticated,
  handleDeleteComment,
  showLines,
  setShowLines,
}) {
  if (showComments)
    return (
      <div className="bg-[#f9f9f9] flex-col justify-around rounded-lg p-2 mb-4">
        <ul role="list" className="divide-y divide-gray-100">
          {posts &&
            posts.slice(0, showLines).map((post) => {
              var tidspunkt = new Date(post.laget);
              tidspunkt = tidspunkt.toLocaleString().replace(",", "");

              var content =
                post.kommentar.length < 400
                  ? post.kommentar
                  : post.kommentar.substring(0, 400);

              return (
                <li
                  key={post.vurdering_id}
                  className="bg-white flex-col rounded-md justify-between gap-x-6 py-5 mb-2 "
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto pl-4">
                      <p className="text-sm/6 font-semibold text-gray-900">
                        Laget: {tidspunkt}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        Vurdering {post.vurdering}/5
                      </p>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end pr-4 max-w-[60%]">
                      <p className="text-sm/6 text-gray-900 break-words overflow-wrap-anywhere">
                        {content}
                      </p>
                    </div>
                  </div>
                  {isAuthenticated && (
                    <div className="flex justify-end pr-4">
                      <button
                        className="flex justify-center rounded-md bg-navbar-orange/40 px-2 h-6 items-center text-sm/10 font-semibold hover:text-black/50 text-black/40 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                        onClick={() => handleDeleteComment(post.vurdering_id)}
                      >
                        Slett
                      </button>
                    </div>
                  )}
                  <div></div>
                </li>
              );
            })}
        </ul>
        {posts && showLines < posts.length && (
          <div className="flex justify-center">
            <button
              className="flex justify-center rounded-md bg-navbar-orange px-2 h-6 items-center text-sm/10 font-semibold hover:text-black/50 text-black/40 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
              onClick={() => setShowLines((current) => current + 2)}
            >
              Vis flere...
            </button>
          </div>
        )}
      </div>
    );
}
