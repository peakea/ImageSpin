# ImageSpin
Tool for spinning the RGB values in images forwards and backwards using 
other images allowing the obfuscation of images with unlimited key images 
and unlimited use of these keys on other other images.

The first set of tests uses image 2 to spin image 1 which is not very 
effective at obfuscating the image.

The second set of tests uses a random key which appears to be fairly 
effective at obfuscating the image although for real world use the key 
should be generated in a more random secure way.

The third set of tests shows using a mixture of images which can be 
added and removed in any order to obfuscate the image but is still 
not effective at totally obfuscating the image.

The fourth set of tests uses a set of random keys which appears to be 
very effective at obfuscating the image although for real world use like 
test 2 the key should be generated in a more random secure way.

Test image 1 https://pixabay.com/photos/puffin-bird-fish-meal-animal-beak-8372701/

Test image 2 https://pixabay.com/pl/photos/g%C3%B3ra-rzeka-potok-sceniczny-natura-8517546/

Test image 3 https://pixabay.com/pl/photos/g%C3%B3ra-alpy-wzg%C3%B3rza-dolina-6253669/

Test image 4 https://pixabay.com/pl/photos/bluets-g%C3%B3rski-wieloletnie-chabry-3440640/

Ashley Peake 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
