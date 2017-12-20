using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;
using System.IO;
using System.Threading;
using System.Drawing.Text;

namespace Impress
{
    public partial class frmMain : Form
    {
        public ChromiumWebBrowser chromeBrowser;
        partial void FullScreen();
        class BridgeClass
        {

            // Declare a local instance of chromium and the main form in order to execute things from here in the main thread
            private static ChromiumWebBrowser _instanceBrowser = null;
            // The form class needs to be changed according to yours
            private static frmMain _instanceMainForm = null;

            
            public BridgeClass(ChromiumWebBrowser originalBrowser, frmMain mainForm)
            {
                _instanceBrowser = originalBrowser;
                _instanceMainForm = mainForm;
            }

            public void saveImpress(object[] saveData)
            {
                SaveFileDialog saveFileDia = new SaveFileDialog();
                saveFileDia.Filter = "Impress presentation files|*.imf";
                
                var thread = new Thread(new ParameterizedThreadStart(param => { saveFileDia.ShowDialog(); }));
                thread.SetApartmentState(ApartmentState.STA);
                thread.Start();
                thread.Join();

                string filePath = saveFileDia.FileName;
                StreamWriter fileWriter = new StreamWriter(filePath);

                fileWriter.AutoFlush = true;
                int i = 0;
                foreach (object item in saveData)
                {
                    
                    fileWriter.WriteLine(item.ToString());
                    System.Diagnostics.Debug.WriteLine(i.ToString() + " " + item.ToString());
                    i++;
                }

                MessageBox.Show("File saved");
            }

            public string colorDialogFun()
            {
                //This code shows a colorDialog from the WinForms API
                //The result is in ARGB, so we covnert it to #RRGGBB format, usable in HTML
                //Then we return the string
                string hexResult;
                ColorDialog slideColorDiagObj = new ColorDialog()
                {
                    AllowFullOpen = true,
                    AnyColor = false,
                    FullOpen = true
                };
                if (slideColorDiagObj.ShowDialog() == DialogResult.OK)
                {
                    hexResult = "#" + slideColorDiagObj.Color.R.ToString("X2") + slideColorDiagObj.Color.G.ToString("X2") + slideColorDiagObj.Color.B.ToString("X2");
                    return hexResult;
                }

                //slideColorDiagObj.Dispose();
                return "Nope";
            }
            public void startFullScreen()
            {
                if (frmMain.ActiveForm.InvokeRequired)
                {
                    frmMain.ActiveForm.BeginInvoke((MethodInvoker)delegate () {

                        frmMain.ActiveForm.WindowState = FormWindowState.Normal;
                        frmMain.ActiveForm.FormBorderStyle = FormBorderStyle.None;
                        frmMain.ActiveForm.WindowState = FormWindowState.Maximized;             
                    });
                }
                else
                {
                    frmMain.ActiveForm.WindowState = FormWindowState.Normal;
                    frmMain.ActiveForm.FormBorderStyle = FormBorderStyle.None;
                    frmMain.ActiveForm.WindowState = FormWindowState.Maximized;
                }
            }

            public void stopFullScreen()
            {
                if (frmMain.ActiveForm.InvokeRequired)
                {
                    frmMain.ActiveForm.BeginInvoke((MethodInvoker)delegate () {

                        frmMain.ActiveForm.WindowState = FormWindowState.Normal;
                        frmMain.ActiveForm.FormBorderStyle = FormBorderStyle.Sizable;
                        frmMain.ActiveForm.WindowState = FormWindowState.Maximized;
                    });
                }
                else
                {
                    frmMain.ActiveForm.WindowState = FormWindowState.Normal;
                    frmMain.ActiveForm.FormBorderStyle = FormBorderStyle.Sizable;
                    frmMain.ActiveForm.WindowState = FormWindowState.Maximized;
                }
            }
        }

        void getFonts()
        {
            using (InstalledFontCollection fontsCollection = new InstalledFontCollection())
            {
                StreamWriter fontListCreator = new StreamWriter(System.IO.Directory.GetCurrentDirectory() + "/fontsList.txt");
                FontFamily[] fontFamilies = fontsCollection.Families;

                fontListCreator.AutoFlush = true;
                foreach (FontFamily font in fontFamilies)
                {
                    fontListCreator.WriteLine(font.Name);
                }
            }
        }

        public frmMain()
        {
            InitializeComponent();
            // Start the browser after initialize global component
            InitializeChromium();

            chromeBrowser.RegisterJsObject("cefCustomObject", new BridgeClass(chromeBrowser, this));
            
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            getFonts();
        }
        public void InitializeChromium()
        {
            CefSettings settings = new CefSettings();

            // Note that if you get an error or a white screen, you may be doing something wrong !
            // Try to load a local file that you're sure that exists and give the complete path instead to test
            // for example, replace page with a direct path instead :
            // String page = @"C:\Users\SDkCarlos\Desktop\afolder\index.html";

            //String page = string.Format(@"{0}\html-resources\html\index.html", Application.StartupPath);
            String page = @"E:\Impress\Impress\HTML%20Core\index.html";


            // Initialize cef with the provided settings
            Cef.Initialize(settings);
            // Create a browser component
            chromeBrowser = new ChromiumWebBrowser(page);

            // Add it to the form and fill it to the form window.
            this.panel2.Controls.Add(chromeBrowser);
            chromeBrowser.Dock = DockStyle.Fill;

            // Allow the use of local resources in the browser
            BrowserSettings browserSettings = new BrowserSettings();
            browserSettings.FileAccessFromFileUrls = CefState.Enabled;
            browserSettings.UniversalAccessFromFileUrls = CefState.Enabled;
            browserSettings.Javascript = CefState.Enabled;
            browserSettings.LocalStorage = CefState.Enabled;
            
            chromeBrowser.BrowserSettings = browserSettings;

        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
        }

        private void btnRefresh_Click(object sender, EventArgs e)
        {   
            chromeBrowser.Reload();
        }

        private void btnDevTools_Click(object sender, EventArgs e)
        {
            chromeBrowser.ShowDevTools();
        }

        private void btnGoUrl_Click(object sender, EventArgs e)
        {
            chromeBrowser.Load(urlBar.Text);
        }
    }
}
