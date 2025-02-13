h-64 object-cover rounded-lg"
              />
              <div className="flex space-x-2">
                <button
                  onClick={shareMeme}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                >
                  {loading ? (
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <>
                      <Share2 className="w-5 h-5 mr-2" />
                      Share
                    </>
                  )}
                </button>
                <button
                  onClick={downloadMeme}
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                >
                  {loading ? (
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    'Download'
                  )}
                </button>
              </div>
              {status && (
                <p className="text-sm text-gray-300 mt-2">{status}</p>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              Generate a meme to see it here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;